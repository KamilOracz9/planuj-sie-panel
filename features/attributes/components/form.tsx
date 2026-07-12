"use client";

import { useTranslations } from "next-intl";
import { use } from "react";
import { AttributeWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import { attributeSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";

interface FormProps {
    onSubmit?: (data: z.infer<typeof attributeSchema>) => void;
    attributePromise?: Promise<AttributeWithTranslations>;
    errors?: Record<string, string> | null;
}

type AttributeFormValues = z.infer<typeof attributeSchema>;

const Form = ({ onSubmit, attributePromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');

    const attribute = attributePromise ? use(attributePromise) : {} as AttributeWithTranslations;

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, attribute.translations ? attribute.translations[locale as keyof typeof attribute.translations]?.name : undefined]));

    const form = useForm<AttributeFormValues>({
        resolver: zodResolver(attributeSchema),
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