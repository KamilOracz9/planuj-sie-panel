"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { currencySchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/features/shared/components/form-container";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import FormField from "@/features/shared/components/form-field";
import { useCurrency } from "../context";

interface FormProps {
    onSubmit?: (data: z.infer<typeof currencySchema>) => void;
    errors?: Record<string, string> | null;
}

type CurrencyFormValues = z.infer<typeof currencySchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tCurrencies = useTranslations('Currencies');
    const { normalizedActiveHash } = useTabs();

    const { currency } = useCurrency();

    const form = useForm<CurrencyFormValues>({
        resolver: zodResolver(currencySchema),
        defaultValues: {
            code: currency.code,
            name: currency.name,
            symbol: currency.symbol,
            decimal_places: currency.decimal_places ?? 2,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) }, 'space-y-4')}>
                    <FormField label={tCurrencies('fields.code')} readonly={!onSubmit} name="code" errors={errors} control={form.control} />
                    <FormField label={tCurrencies('fields.name')} readonly={!onSubmit} name="name" errors={errors} control={form.control} />
                    <FormField label={tCurrencies('fields.symbol')} readonly={!onSubmit} name="symbol" errors={errors} control={form.control} />
                    <FormField label={tCurrencies('fields.decimal_places')} readonly={!onSubmit} name="decimal_places" errors={errors} control={form.control} type="number" />
                </div>
            </>
        </FormContainer>

    )
}

export default Form
