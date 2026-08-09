import { Currency, CurrencySelectItem } from "./types";

export const fetchCurrenciesList = async ({ locale }: { locale: string }): Promise<Currency[]> => await fetch(`${process.env.API_URL}/${locale}/currencies`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchCurrency = async ({ locale, id }: { locale: string, id: Currency['id'] }): Promise<Currency> => await fetch(`${process.env.API_URL}/${locale}/currencies/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchCurrenciesListForSelect = async ({ locale }: { locale: string }): Promise<CurrencySelectItem[]> => await fetch(`${process.env.API_URL}/${locale}/currencies/select`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
