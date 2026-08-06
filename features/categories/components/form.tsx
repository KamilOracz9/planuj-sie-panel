"use client";

import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import { categorySchema } from "../schemas";
import { useCategory } from "../hooks";
import Select from "@/features/shared/components/select";
import { useMemo } from "react";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import { ModelAttributes } from "@/features/attributes";
import { EntityMediaManager, DocumentsManager } from "@/features/media";
import { ChannelVisibilityField } from "@/features/channels";

interface FormProps {
    onSubmit?: (data: z.infer<typeof categorySchema>) => void;
    errors?: Record<string, string> | null;
}

type CategoryFormValues = z.infer<typeof categorySchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tCategories = useTranslations('Categories');
    const { normalizedActiveHash } = useTabs();

    const { defaultNameValues, defaultDescriptionValues, defaultShortDescriptionValues, selectedParentCategory, category, categoriesSelect, defaultAttributes, defaultChannels } = useCategory();

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: defaultNameValues,
            parent_id: category.parent_id ?? null,
            description: defaultDescriptionValues,
            short_description: defaultShortDescriptionValues,
            attributes: defaultAttributes,
            channels: defaultChannels,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.translations'), tShared('tabs.attributes'), tShared('tabs.channels'), tShared('tabs.media'), tShared('tabs.documents')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) })}>
                    <Select
                        label={tCategories('fields.parent_id')}
                        name={'parent_id'}
                        items={[{ id: null, name: tShared('values.null') }, ...categoriesSelect]}
                        formControl={form.control}
                        defaultValue={selectedParentCategory?.name}
                        disabled={!onSubmit}
                        errors={errors}
                        emptyMessage={tShared('messages.no-items-found')}
                    />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.translations'), tabs) })}>
                    <Accordion type="single" collapsible defaultValue="pl-PL">
                        {routing.locales.map(locale => (
                            <AccordionItem key={locale} value={locale}>
                                <AccordionTrigger>{locale}</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <FormField label={tCategories(`fields.name`)} readonly={!onSubmit} name={`name.${locale}`} errors={errors} control={form.control} />
                                    <FormField label={tCategories(`fields.description`)} readonly={!onSubmit} name={`description.${locale}`} errors={errors} control={form.control} />
                                    <FormField label={tCategories(`fields.short_description`)} readonly={!onSubmit} name={`short_description.${locale}`} errors={errors} control={form.control} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.attributes'), tabs) })}>
                    <div className="space-y-4">
                        <ModelAttributes
                            form={form}
                            label={tCategories('fields.attribute_id')}
                            onSubmit={onSubmit}
                            errors={errors}
                        />
                    </div>
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.channels'), tabs) })}>
                    <ChannelVisibilityField form={form} onSubmit={onSubmit} errors={errors} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.media'), tabs) })}>
                    <EntityMediaManager modelType="categories" id={category.id} shape="icon" disabled={!onSubmit} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.documents'), tabs) })}>
                    <DocumentsManager modelType="categories" id={category.id} disabled={!onSubmit} />
                </div>
            </>
        </FormContainer>

    )
}

export default Form