"use client";

import { createContext, useContext } from "react";
import { VariantWithTranslations } from "./types";
import { ProductSelectItem } from "../products";

export const VariantContext = createContext<{
    variantPromise: Promise<VariantWithTranslations> | undefined,
    productsSelectPromise: Promise<ProductSelectItem[]> | undefined
} | undefined>(undefined);

export const useVariant = () => {
    const ctx = useContext(VariantContext);
    if (!ctx) throw new Error("useVariant must be used within VariantContext");
    return ctx;
};