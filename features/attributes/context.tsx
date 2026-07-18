"use client";

import { createContext, useContext } from "react";
import { AttributeType, AttributeWithTranslations } from "./types";

export const AttributeContext = createContext<{
    attributePromise: Promise<AttributeWithTranslations> | undefined,
    attributeTypesPromise: Promise<AttributeType[]> | undefined
} | undefined>(undefined);


export const useAttribute = () => {
    const ctx = useContext(AttributeContext);
    if (!ctx) throw new Error("useAttribute must be used within AttributeContext");
    return ctx;
};