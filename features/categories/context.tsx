"use client";

import { createContext } from "react";
import { CategoryWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes";

export const CategoryContext = createContext<{
    categoryPromise: Promise<CategoryWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]>
} | undefined>(undefined);
