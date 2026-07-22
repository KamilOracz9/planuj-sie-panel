"use client";

import { createContext } from "react";
import { CategorySelectItem, CategoryWithTranslations } from "./types";

export const CategoryContext = createContext<{
    categoryPromise: Promise<CategoryWithTranslations> | undefined,
    categoriesSelectPromise: Promise<CategorySelectItem[]> | undefined
} | undefined>(undefined);
