"use client";

import { createContext, useContext } from "react";
import { BrandWithTranslations } from "./types";
import { Attribute, ExistingAttributeValue } from "../attributes/types";

export const BrandContext = createContext<{
    brandPromise: Promise<BrandWithTranslations> | undefined,
    attributesSelectPromise: Promise<Attribute[]> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]>
} | undefined>(undefined);

export const useBrand = () => {
    const ctx = useContext(BrandContext);
    if (!ctx) throw new Error("useBrand must be used within BrandContext");
    return ctx;
};