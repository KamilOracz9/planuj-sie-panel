"use client";

import { createContext, useContext } from "react";
import { VariantWithTranslations } from "./types";
import { ProductSelectItem } from "../products";
import { ExistingAttributeValue } from "../attributes/types";
import { ExistingChannelVisibility } from "../channels/types";
import { ExistingPrice } from "../prices/types";

export const VariantContext = createContext<{
    variantPromise: Promise<VariantWithTranslations> | undefined,
    productsSelectPromise: Promise<ProductSelectItem[]> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]> | undefined,
    existingChannelsPromise: Promise<ExistingChannelVisibility[]> | undefined,
    existingPricesPromise: Promise<ExistingPrice[]> | undefined,
} | undefined>(undefined);

export const useVariant = () => {
    const ctx = useContext(VariantContext);
    if (!ctx) throw new Error("useVariant must be used within VariantContext");
    return ctx;
};