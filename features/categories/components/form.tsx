"use client";

import { useTranslations } from "next-intl";
import { use, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import { categorySchema } from "../schemas";
import { CategorySelectItem, CategoryWithTranslations } from "../types";
import { Field, FieldError, FieldLabel } from "@/features/shared/components/ui/field";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/features/shared/components/ui/combobox";

interface FormProps {
    onSubmit?: (data: z.infer<typeof categorySchema>) => void;
    categoryPromise?: Promise<CategoryWithTranslations>;
    categoriesSelectPromise?: Promise<CategorySelectItem[]>;
    errors?: Record<string, string> | null;
}

type CategoryFormValues = z.infer<typeof categorySchema>;

const Form = ({ onSubmit, categoryPromise, categoriesSelectPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tCategories = useTranslations('Categories');

    const category = categoryPromise ? use(categoryPromise) : {} as CategoryWithTranslations;
    const categoriesSelect = categoriesSelectPromise ? use(categoriesSelectPromise).filter(c => c.id !== category.id) : [] as CategorySelectItem[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.name ?? undefined]));
    const defaultDescriptionValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.description ?? undefined]));
    const defaultShortDescriptionValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.short_description ?? undefined]));

    const selectedParentCategory = useMemo(() => categoriesSelect.find(c => c.id === category.parent_id), [categoriesSelect, category.parent_id]);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: defaultNameValues,
            parent_id: category.parent_id ?? null,
            description: defaultDescriptionValues,
            short_description: defaultShortDescriptionValues,
        },
    })

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Field>
                    <FieldLabel htmlFor={'parent_id'}>{tCategories('fields.parent_id')}</FieldLabel>
                    <Controller
                        control={form.control}
                        name={'parent_id'}
                        render={({ field }) => (
                            <Combobox disabled={!onSubmit} items={[{ id: null, name: tShared('values.null') }, ...categoriesSelect]} autoHighlight multiple={false} defaultValue={selectedParentCategory?.name} onValueChange={(value) => {
                                const selectedCategory = categoriesSelect.find(c => c.name === value);
                                field.onChange(selectedCategory ? selectedCategory.id : null);
                            }}>
                                <ComboboxInput disabled={!onSubmit} readOnly={!onSubmit} placeholder={tCategories('fields.parent_id')} className="focus-visible:ring-0" />
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
                            <AccordionTrigger>{tShared(`fields.name`)} ({locale})</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <FormField readonly={!onSubmit} name={`name.${locale}`} errors={errors} control={form.control} />
                                <FormField readonly={!onSubmit} name={`description.${locale}`} errors={errors} control={form.control} />
                                <FormField readonly={!onSubmit} name={`short_description.${locale}`} errors={errors} control={form.control} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </>
        </FormContainer>

    )
}

export default Form