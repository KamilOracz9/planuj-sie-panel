"use client";

import { Button } from "@/features/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/features/shared/components/ui/field"
import { Input } from "@/features/shared/components/ui/input"
import { useTranslations } from "next-intl";
import { use } from "react";
import { BrandWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { Controller, FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { brandSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";

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
        <Container onSubmit={onSubmit} form={form} >
            <>
                <Accordion type="single" collapsible defaultValue="pl-PL">
                    {routing.locales.map(locale => (
                        <AccordionItem key={locale} value={locale}>
                            <AccordionTrigger>{tShared('fields.name')} ({locale})</AccordionTrigger>
                            <AccordionContent>
                                {/* <Field>
                                    <Controller
                                        control={form.control}
                                        name={`name.${locale}` as const}
                                        render={({ field }) => (
                                            <Input id={`name-${locale}`} {...field} />
                                        )}
                                    />
                                    {errors && errors[`name.${locale}`] && (
                                        <FieldError>{errors[`name.${locale}`]}</FieldError>
                                    )}
                                </Field> */}
                                <FormField name={`name.${locale}`} errors={errors} control={form.control} />
                            </AccordionContent>
                        </AccordionItem>
                    ))} 
                </Accordion>

                {onSubmit && (
                    <Field orientation="horizontal" className="flex justify-end">
                        <Button type="submit">
                            {tShared('actions.save')}
                        </Button>
                    </Field>
                )}
            </>
        </Container>

    )
}

interface ContainerProps<TFormValues extends FieldValues> {
    children: React.ReactNode;
    onSubmit?: (data: TFormValues) => void;
    form?: UseFormReturn<TFormValues>;
}

const Container = <TFormValues extends FieldValues>({ children, onSubmit, form }: ContainerProps<TFormValues>) => {
    return !onSubmit ? <div>{children}</div> : <form onSubmit={form?.handleSubmit(onSubmit)}>{children}</form>
}

export default Form