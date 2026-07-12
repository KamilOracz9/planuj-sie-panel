"use client";

import { createContext, useContext } from "react";
import { AttributeWithTranslations } from "./types";

export const AttributeContext = createContext<Promise<AttributeWithTranslations> | null>(null);

export const useAttribute = () => {
    const ctx = useContext(AttributeContext);
    if (!ctx) throw new Error("useAttribute must be used within AttributeContext");
    return ctx;
};