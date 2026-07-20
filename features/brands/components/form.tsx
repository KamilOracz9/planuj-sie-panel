"use client";

import { useTranslations } from "next-intl";
import { use, useMemo } from "react";
import FormField from "@/features/shared/components/form-field";
import { BrandWithTranslations } from "../types";
import { useFieldArray, useForm } from "react-hook-form";
import { brandSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormContainer from "@/features/shared/components/form-container";
import Tabs, { useTabs } from "@/features/shared/components/tabs";
import { cn, slugify } from "@/lib/utils";
import TranslatedField from "@/features/shared/components/translated-field";
import { Attribute, ExistingAttributeValue } from "@/features/attributes/types";
import Select from "@/features/shared/components/select";
import { Button } from "@/features/shared/components/ui/button";

interface FormProps {
    onSubmit?: (data: z.infer<typeof brandSchema>) => void;
    brandPromise?: Promise<BrandWithTranslations>;
    attributesSelectPromise?: Promise<Attribute[]>;
    existingAttributesPromise?: Promise<ExistingAttributeValue[]>;
    errors?: Record<string, string> | null;
}

type BrandFormValues = z.infer<typeof brandSchema>;

const Form = ({ onSubmit, brandPromise, attributesSelectPromise, existingAttributesPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tBrands = useTranslations('Brands');
    const { normalizedActiveHash } = useTabs();

    const brand = brandPromise ? use(brandPromise) : {} as BrandWithTranslations;
    const attributesSelect = attributesSelectPromise ? use(attributesSelectPromise) : [] as Attribute[];
    const existingAttributes = existingAttributesPromise ? use(existingAttributesPromise) : [] as ExistingAttributeValue[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, brand.translations ? brand.translations[locale as keyof typeof brand.translations]?.name : undefined]));

    const defaultAttributes = existingAttributes?.map(av => ({
        attribute_id: String(av.attribute_id),
        data: av.data,
    })) ?? [];

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: defaultNameValues,
            attributes: defaultAttributes,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'attributes',
    });

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.attributes')]
    }, [])

    const attributeSelectItems = attributesSelect.map(a => ({ id: String(a.id), name: a.name }));

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': normalizedActiveHash !== slugify(tShared('tabs.basic')) })}>
                    <TranslatedField onSubmit={!!onSubmit} errors={errors} form={form} />
                </div>

                <div className={cn({ 'hidden': normalizedActiveHash !== slugify(tShared('tabs.attributes')) })}>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <Select
                                        label={tBrands('fields.attribute_id')}
                                        name={`attributes.${index}.attribute_id`}
                                        items={attributeSelectItems}
                                        formControl={form.control}
                                        disabled={!onSubmit}
                                        errors={errors}
                                        defaultValue={attributesSelect.find(a => String(a.id) === field.attribute_id)?.name}
                                    />
                                </div>
                                <div className="flex-1">
                                    <FormField
                                        readonly={!onSubmit}
                                        name={`attributes.${index}.data`}
                                        errors={errors}
                                        control={form.control}
                                    />
                                </div>
                                {onSubmit && (
                                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                        {tShared('actions.remove')}
                                    </Button>
                                )}
                            </div>
                        ))}
                        {onSubmit && (
                            <Button type="button" variant="outline" onClick={() => append({ attribute_id: '', data: '' })}>
                                {tShared('actions.add')}
                            </Button>
                        )}
                    </div>
                </div>
            </>
        </FormContainer>

    )
}

export default Form