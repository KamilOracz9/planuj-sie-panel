"use client";

import { createContext, useContext } from "react";
import { BrandWithTranslations } from "./types";

export const BrandContext = createContext<Promise<BrandWithTranslations> | null>(null);

export const useBrand = () => {
    const ctx = useContext(BrandContext);
    if (!ctx) throw new Error("useBrand must be used within UserProvider");
    return ctx;
};