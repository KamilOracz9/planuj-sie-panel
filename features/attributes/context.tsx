"use client";

import { createContext, useContext } from "react";
import { AttributeOptionWithTranslations, AttributeType, AttributeWithTranslations } from "./types";
import { ExistingPrice } from "../prices/types";

export const AttributeContext = createContext<{
    attributePromise: Promise<AttributeWithTranslations> | undefined,
    attributeTypesPromise: Promise<AttributeType[]> | undefined
} | undefined>(undefined);

// Separate from AttributeContext: this backs the AttributeOption's own
// dedicated edit/show pages (features/attributes/components/attribute-option-form.tsx),
// not the Attribute entity's "Opcje" tab (which only reads the select-list).
export const AttributeOptionContext = createContext<{
    optionPromise: Promise<AttributeOptionWithTranslations> | undefined,
    existingPricesPromise: Promise<ExistingPrice[]> | undefined,
} | undefined>(undefined);

export const useAttributeOption = () => {
    const ctx = useContext(AttributeOptionContext);
    if (!ctx) throw new Error("useAttributeOption must be used within AttributeOptionContext");
    return ctx;
};
