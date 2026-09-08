"use server"

import { apiFetch } from "@/lib/api-client";

import { Currency, CurrencySelectItem } from "@/features/currencies"
import { currencySchema } from "@/features/currencies/schemas"

import * as z from "zod";

export async function deleteCurrency(currencyId: Currency['id']): Promise<{ id: Currency['id'] }> {
    return await apiFetch(`/currencies/${currencyId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createCurrency(data: z.infer<typeof currencySchema>) {
    return await apiFetch(`/currencies`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateCurrency(data: z.infer<typeof currencySchema>, id: Currency['id']) {
    return await apiFetch(`/currencies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchCurrenciesListForSelect({ locale }: { locale: string }): Promise<CurrencySelectItem[]> {
    return await apiFetch(`/${locale}/currencies/select`, {}).then(res => res.json());
}
