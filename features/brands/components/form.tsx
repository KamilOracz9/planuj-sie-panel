"use client";

import { useTranslations } from "next-intl";
import { use } from "react";
import { BrandWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import { brandSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";

interface FormProps {
    onSubmit?: (data: z.infer<typeof brandSchema>) => void;
    brandPromise?: Promise<BrandWithTranslations>;
    errors?: Record<string, string> | null;
}

type BrandFormValues = z.infer<typeof brandSchema>;

const Form = ({ onSubmit, brandPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');

    const brand = brandPromise ? use(brandPromise) : {} as BrandWithTranslations;

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, brand.translations ? brand.translations[locale as keyof typeof brand.translations]?.name : undefined]));

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: defaultNameValues,
        },
    })

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
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