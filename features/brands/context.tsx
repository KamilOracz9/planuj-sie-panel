"use client";

import { createContext, use, useContext } from "react";
import { BrandWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes/types";
import { routing } from "@/lib/i18n/routing";

export const BrandContext = createContext<{
    brandPromise: Promise<BrandWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]>
} | undefined>(undefined);

export const useBrand = () => {
    const ctx = useContext(BrandContext);
    const brand = ctx?.brandPromise ? use(ctx.brandPromise) : {} as BrandWithTranslations;
    const existingAttributes = ctx?.existingAttributesPromise ? use(ctx.existingAttributesPromise) : [] as ExistingAttributeValue[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, brand.translations ? brand.translations[locale as keyof typeof brand.translations]?.name : undefined]));

    const defaultAttributes = existingAttributes?.map(av => ({
        id: av.id,
        attribute_id: String(av.attribute_id),
        data: av.data,
    })) ?? [];

    return {
        ...ctx,
        brand,
        existingAttributes,
        defaultNameValues,
        defaultAttributes
    };
};