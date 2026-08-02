"use client";

import { createContext, use, useContext } from "react";
import { ProductWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes/types";
import { routing } from "@/lib/i18n/routing";

export const ProductContext = createContext<{
    productPromise: Promise<ProductWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]> | undefined
} | undefined>(undefined);

export const useProduct = () => {
    const ctx = useContext(ProductContext);
    const product = ctx?.productPromise ? use(ctx.productPromise) : {} as ProductWithTranslations;
    const existingAttributes = ctx?.existingAttributesPromise ? use(ctx.existingAttributesPromise) : [] as ExistingAttributeValue[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, product.translations ? product.translations[locale as keyof typeof product.translations]?.name : undefined]));

    const defaultAttributes = existingAttributes?.map(av => ({
        id: av.id,
        attribute_id: String(av.attribute_id),
        data: av.data,
    })) ?? [];

    return {
        ...ctx,
        product,
        existingAttributes,
        defaultNameValues,
        defaultAttributes,
    };
};
