"use client";

import { useTranslations } from "next-intl";
import { use, useMemo } from "react";
import { AttributeType, AttributeWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { Controller, useForm } from "react-hook-form";
import { attributeSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import { Field, FieldError, FieldLabel } from "@/features/shared/components/ui/field";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/features/shared/components/ui/combobox";

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
        },
    })

    const selectedAttributeType = useMemo(() => attributeTypesSelect.find(c => c.id === attribute.attribute_type_id), [attributeTypesSelect, attribute.attribute_type_id]);

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Field>
                    <FieldLabel htmlFor={'parent_id'}>{tAttributes('fields.type')}</FieldLabel>
                    <Controller
                        control={form.control}
                        name={'attribute_type_id'}
                        render={({ field }) => (
                            <Combobox disabled={!onSubmit} items={[{ id: null, name: tShared('values.null') }, ...attributeTypesSelect]} autoHighlight multiple={false} defaultValue={selectedAttributeType?.name} onValueChange={(value) => {
                                const selectedCategory = attributeTypesSelect.find(c => c.name === value);
                                field.onChange(selectedCategory ? selectedCategory.id : null);
                            }}>
                                <ComboboxInput disabled={!onSubmit} readOnly={!onSubmit} placeholder={tAttributes('fields.type')} className="focus-visible:ring-0" />
                                <ComboboxContent>
                                    <ComboboxEmpty>{tShared('messages.no-items-found')}</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item.id} value={item.name}>
                                                {item.name}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        )}
                    />
                    {errors && errors['parent_id'] && (
                        <FieldError>{errors['parent_id']}</FieldError>
                    )}
                </Field>

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