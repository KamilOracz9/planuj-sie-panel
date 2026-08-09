"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { mediaCollectionSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/features/shared/components/form-container";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import FormField from "@/features/shared/components/form-field";
import Select from "@/features/shared/components/select";
import { useMediaCollection } from "../context";
import ConversionEditor from "./conversion-editor";
import AssignmentEditor from "./assignment-editor";

const KIND_ITEMS = [
    { id: "image", name: "image" },
    { id: "document", name: "document" },
];

const TYPE_ITEMS = [
    { id: "single", name: "single" },
    { id: "multiple", name: "multiple" },
];

interface FormProps {
    onSubmit?: (data: z.infer<typeof mediaCollectionSchema>) => void;
    errors?: Record<string, string> | null;
}

type MediaCollectionFormValues = z.infer<typeof mediaCollectionSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tMediaCollections = useTranslations('MediaCollections');
    const { normalizedActiveHash } = useTabs();

    const { mediaCollection } = useMediaCollection();

    const form = useForm<MediaCollectionFormValues>({
        resolver: zodResolver(mediaCollectionSchema),
        defaultValues: {
            code: mediaCollection.code,
            name: mediaCollection.name,
            kind: mediaCollection.kind ?? 'image',
            type: mediaCollection.type ?? 'multiple',
            conversions: mediaCollection.conversions ?? [],
            assignments: mediaCollection.assignments ?? [],
        },
    })

    const kind = form.watch('kind');
    const currentKindItem = KIND_ITEMS.find(k => k.id === kind);
    const currentTypeItem = TYPE_ITEMS.find(t => t.id === form.watch('type'));

    const tabs = useMemo(() => {
        const items = [tShared('tabs.basic'), tShared('tabs.assignments')];
        if (kind === 'image') {
            items.push(tShared('tabs.conversions'));
        }
        return items;
    }, [kind, tShared])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) }, 'space-y-4')}>
                    <FormField label={tMediaCollections('fields.code')} readonly={!onSubmit} name="code" errors={errors} control={form.control} />
                    <FormField label={tMediaCollections('fields.name')} readonly={!onSubmit} name="name" errors={errors} control={form.control} />
                    <Select
                        label={tMediaCollections('fields.kind')}
                        name="kind"
                        items={KIND_ITEMS}
                        formControl={form.control}
                        disabled={!onSubmit}
                        errors={errors}
                        defaultValue={currentKindItem?.name}
                        emptyMessage={tShared('messages.no-items-found')}
                    />
                    <Select
                        label={tMediaCollections('fields.type')}
                        name="type"
                        items={TYPE_ITEMS}
                        formControl={form.control}
                        disabled={!onSubmit}
                        errors={errors}
                        defaultValue={currentTypeItem?.name}
                        emptyMessage={tShared('messages.no-items-found')}
                    />
                </div>
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.assignments'), tabs) })}>
                    <AssignmentEditor form={form} onSubmit={onSubmit} errors={errors} />
                </div>
                {kind === 'image' && (
                    <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.conversions'), tabs) })}>
                        <ConversionEditor form={form} onSubmit={onSubmit} errors={errors} />
                    </div>
                )}
            </>
        </FormContainer>

    )
}

export default Form
