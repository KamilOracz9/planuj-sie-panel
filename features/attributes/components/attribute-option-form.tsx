"use client";

import { useTranslations } from "next-intl";
import { use, useMemo } from "react";
import { AttributeOptionWithTranslations } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/ui/accordion";
import { useForm } from "react-hook-form";
import { attributeOptionSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { routing } from "@/lib/i18n/routing";
import FormField from "@/features/shared/components/form-field";
import FormContainer from "@/features/shared/components/form-container";
import Select from "@/features/shared/components/select";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import { EntityMediaManager } from "@/features/media";
import { PriceEditor } from "@/features/prices";
import { ExistingPrice } from "@/features/prices/types";
import { useAttribute } from "../hooks";

interface AttributeOptionFormProps {
    onSubmit?: (data: z.infer<typeof attributeOptionSchema>) => void;
    optionPromise?: Promise<AttributeOptionWithTranslations>;
    existingPricesPromise?: Promise<ExistingPrice[]>;
    defaultAttributeId?: number | null;
    errors?: Record<string, string> | null;
}

type AttributeOptionFormValues = z.infer<typeof attributeOptionSchema>;

const AttributeOptionForm = ({ onSubmit, optionPromise, existingPricesPromise, defaultAttributeId, errors }: AttributeOptionFormProps) => {
    const tShared = useTranslations('Shared');
    const tAttributeOptions = useTranslations('AttributeOptions');
    const { normalizedActiveHash } = useTabs();
    const { attributesSelect } = useAttribute();

    const option = optionPromise ? use(optionPromise) : {} as AttributeOptionWithTranslations;
    // No fallback for prices (same reasoning as Product/Variant forms): a
    // price row only exists for explicit (channel, currency) pairs.
    const defaultPrices = existingPricesPromise ? use(existingPricesPromise) : [] as ExistingPrice[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, option.translations ? option.translations[locale as keyof typeof option.translations]?.name : undefined]));

    const selectedAttribute = useMemo(() => attributesSelect.find(a => a.id === (option.attribute_id ?? defaultAttributeId)), [attributesSelect, option.attribute_id, defaultAttributeId]);

    const form = useForm<AttributeOptionFormValues>({
        resolver: zodResolver(attributeOptionSchema),
        defaultValues: {
            name: defaultNameValues,
            attribute_id: option.attribute_id ?? defaultAttributeId ?? null,
            prices: defaultPrices,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.prices'), tShared('tabs.media')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) })}>
                    <Select
                        label={tAttributeOptions('fields.attribute_id')}
                        name={'attribute_id'}
                        items={attributesSelect}
                        formControl={form.control}
                        defaultValue={selectedAttribute?.name}
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
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.prices'), tabs) })}>
                    <PriceEditor form={form} onSubmit={onSubmit} errors={errors} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.media'), tabs) })}>
                    <EntityMediaManager modelType="attribute-options" id={option.id} disabled={!onSubmit} />
                </div>
            </>
        </FormContainer>

    )
}

export default AttributeOptionForm
