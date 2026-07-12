"use client";

import { useTranslations } from "next-intl";
import { use, useMemo } from "react";
import { VariantWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { Controller, useForm } from "react-hook-form";
import { variantSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import { ProductSelectItem } from "@/features/products";
import { Field, FieldError, FieldLabel } from "@/features/shared/components/ui/field";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList } from "@/features/shared/components/ui/combobox";

interface FormProps {
    onSubmit?: (data: z.infer<typeof variantSchema>) => void;
    variantPromise?: Promise<VariantWithTranslations>;
    productsSelectPromise?: Promise<ProductSelectItem[]>;
    errors?: Record<string, string> | null;
}

type VariantFormValues = z.infer<typeof variantSchema>;

const Form = ({ onSubmit, variantPromise, productsSelectPromise, errors }: FormProps) => {
    const tVariants = useTranslations('Variants');
    const tShared = useTranslations('Shared');

    const variant = variantPromise ? use(variantPromise) : {} as VariantWithTranslations;
    const productsSelect = productsSelectPromise ? use(productsSelectPromise) : [] as ProductSelectItem[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, variant.translations ? variant.translations[locale as keyof typeof variant.translations]?.name : undefined]));

    const selectedProduct = useMemo(() => productsSelect.find(p => p.id === variant.product_id), [productsSelect, variant.product_id]);

    console.log(productsSelect)

    const form = useForm<VariantFormValues>({
        resolver: zodResolver(variantSchema),
        defaultValues: {
            name: defaultNameValues,
            product_id: variant.product_id ?? null,
        },
    })

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Field>
                    <FieldLabel htmlFor={'product_id'}>{tVariants('fields.product_id')}</FieldLabel>
                    <Controller
                        control={form.control}
                        name={'product_id'}
                        render={({ field }) => (
                            <Combobox disabled={!onSubmit} items={[{ id: null, name: tShared('values.null') }, ...productsSelect]} autoHighlight multiple={false} defaultValue={selectedProduct?.name} onValueChange={(value) => {
                                const selectedProduct = productsSelect.find(c => c.name === value);
                                field.onChange(selectedProduct ? selectedProduct.id : null);
                            }}>
                                <ComboboxInput disabled={!onSubmit} readOnly={!onSubmit} placeholder={tVariants('fields.product_id')} className="focus-visible:ring-0" />
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
                    {errors && errors['product_id'] && (
                        <FieldError>{errors['product_id']}</FieldError>
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