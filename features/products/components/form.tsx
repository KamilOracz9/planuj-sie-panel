"use client";

import { useTranslations } from "next-intl";
import { use } from "react";
import { ProductWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import { productSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";

interface FormProps {
    onSubmit?: (data: z.infer<typeof productSchema>) => void;
    productPromise?: Promise<ProductWithTranslations>;
    errors?: Record<string, string> | null;
}

type ProductFormValues = z.infer<typeof productSchema>;

const Form = ({ onSubmit, productPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');

    const product = productPromise ? use(productPromise) : {} as ProductWithTranslations;

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, product.translations ? product.translations[locale as keyof typeof product.translations]?.name : undefined]));

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
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