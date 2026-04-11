"use client";

import { createContext, useContext } from "react";
import { CategorySelectItem, CategoryWithTranslations } from "./types";

export const CategoryContext = createContext<{ categoryPromise: Promise<CategoryWithTranslations> | undefined, categoriesSelectPromise: Promise<CategorySelectItem[]> | undefined } | undefined>(undefined);

export const useCategory = () => {
    const ctx = useContext(CategoryContext);
    if (!ctx) throw new Error("useCategory must be used within CategoryProvider");
    return ctx;
};