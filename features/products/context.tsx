"use client";

import { createContext, useContext } from "react";
import { ProductWithTranslations } from "./types";

export const ProductContext = createContext<Promise<ProductWithTranslations> | null>(null);

export const useProduct = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProduct must be used within ProductContext");
    return ctx;
};