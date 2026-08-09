"use server"

import { Currency, CurrencySelectItem } from "@/features/currencies"
import { currencySchema } from "@/features/currencies/schemas"

import * as z from "zod";

export async function deleteCurrency(currencyId: Currency['id']): Promise<{ id: Currency['id'] }> {
    return await fetch(`${process.env.API_URL}/currencies/${currencyId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createCurrency(data: z.infer<typeof currencySchema>) {
    return await fetch(`${process.env.API_URL}/currencies`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateCurrency(data: z.infer<typeof currencySchema>, id: Currency['id']) {
    return await fetch(`${process.env.API_URL}/currencies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchCurrenciesListForSelect({ locale }: { locale: string }): Promise<CurrencySelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/currencies/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
