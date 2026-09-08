import { Currency, CurrencySelectItem } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchCurrenciesList = async ({ locale }: { locale: string }): Promise<Currency[]> => await apiFetch(`/${locale}/currencies`, {}).then(res => res.json());

export const fetchCurrency = async ({ locale, id }: { locale: string, id: Currency['id'] }): Promise<Currency> => await apiFetch(`/${locale}/currencies/${id}`, {}).then(res => res.json());

export const fetchCurrenciesListForSelect = async ({ locale }: { locale: string }): Promise<CurrencySelectItem[]> => await apiFetch(`/${locale}/currencies/select`, {}).then(res => res.json());
