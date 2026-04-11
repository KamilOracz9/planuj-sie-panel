"use client";

import { createContext, useContext } from "react";
import { CategoryWithTranslations } from "./types";

export const CategoryContext = createContext<Promise<CategoryWithTranslations> | null>(null);

export const useCategory = () => {
    const ctx = useContext(CategoryContext);
    if (!ctx) throw new Error("useCategory must be used within CategoryProvider");
    return ctx;
};