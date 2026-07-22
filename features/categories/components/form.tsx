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

interface FormProps {
    onSubmit?: (data: z.infer<typeof categorySchema>) => void;
    errors?: Record<string, string> | null;
}

type CategoryFormValues = z.infer<typeof categorySchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tCategories = useTranslations('Categories');

    const { defaultNameValues, defaultDescriptionValues, defaultShortDescriptionValues, selectedParentCategory, category, categoriesSelect } = useCategory();

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
            </>
        </FormContainer>

    )
}

export default Form