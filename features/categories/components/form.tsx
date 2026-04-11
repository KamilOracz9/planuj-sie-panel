"use client";

import { useTranslations } from "next-intl";
import { use } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import { categorySchema } from "../schemas";
import { CategoryWithTranslations } from "../types";

interface FormProps {
    onSubmit?: (data: z.infer<typeof categorySchema>) => void;
    categoryPromise?: Promise<CategoryWithTranslations>;
    errors?: Record<string, string> | null;
}

type CategoryFormValues = z.infer<typeof categorySchema>;

const Form = ({ onSubmit, categoryPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');

    const category = categoryPromise ? use(categoryPromise) : {} as CategoryWithTranslations;

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[ locale as keyof typeof category.translations]?.name ?? undefined]));
    const defaultDescriptionValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.description ?? undefined]));
    const defaultShortDescriptionValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.short_description ?? undefined]));

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: defaultNameValues,
            description: defaultDescriptionValues,
            short_description: defaultShortDescriptionValues,
        },
    })

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
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