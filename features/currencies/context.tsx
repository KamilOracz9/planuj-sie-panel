"use client";

import { createContext, use, useContext } from "react";
import { Currency } from "./types";

export const CurrencyContext = createContext<{
    currencyPromise: Promise<Currency> | undefined,
} | undefined>(undefined);

export const useCurrency = () => {
    const ctx = useContext(CurrencyContext);
    const currency = ctx?.currencyPromise ? use(ctx.currencyPromise) : {} as Currency;

    return {
        ...ctx,
        currency,
    };
};
