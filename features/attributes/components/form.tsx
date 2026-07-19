"use client";

import { useTranslations } from "next-intl";
import { use, useMemo } from "react";
import { AttributeType, AttributeWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import { attributeSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import Select from "@/features/shared/components/select";

interface FormProps {
    onSubmit?: (data: z.infer<typeof attributeSchema>) => void;
    attributePromise?: Promise<AttributeWithTranslations>;
    attributeTypesSelectPromise?: Promise<AttributeType[]>;
    errors?: Record<string, string> | null;
}

type AttributeFormValues = z.infer<typeof attributeSchema>;

const Form = ({ onSubmit, attributePromise, attributeTypesSelectPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tAttributes = useTranslations('Attributes');

    const attribute = attributePromise ? use(attributePromise) : {} as AttributeWithTranslations;
    const attributeTypesSelect = attributeTypesSelectPromise ? use(attributeTypesSelectPromise) : [] as AttributeType[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, attribute.translations ? attribute.translations[locale as keyof typeof attribute.translations]?.name : undefined]));

    const form = useForm<AttributeFormValues>({
        resolver: zodResolver(attributeSchema),
        defaultValues: {
            name: defaultNameValues,
            attribute_type_id: attribute.attribute_type_id ?? null,
        },
    })

    const selectedAttributeType = useMemo(() => attributeTypesSelect.find(c => c.id === attribute.attribute_type_id), [attributeTypesSelect, attribute.attribute_type_id]);

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Select
                    label={tAttributes('fields.type')}
                    name={'attribute_type_id'}
                    items={[{ id: null, name: tShared('values.null') }, ...attributeTypesSelect]}
                    formControl={form.control}
                    defaultValue={selectedAttributeType?.name}
                    disabled={!onSubmit}
                    errors={errors}
                    emptyMessage={tShared('messages.no-items-found')}
                />

                <Accordion type="single" collapsible defaultValue="pl-PL">
                    {routing.locales.map(locale => (
                        <AccordionItem key={locale} value={locale}>
                            <AccordionTrigger>{tShared('fields.name')} ({locale})</AccordionTrigger>
                            <AccordionContent>
                                <FormField readonly={!onSubmit} name={`name.${locale}`} errors={errors} control={form.control} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </>
        </FormContainer>

    )
}

export default Form