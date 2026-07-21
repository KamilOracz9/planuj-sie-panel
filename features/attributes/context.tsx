"use client";

import { createContext } from "react";
import { AttributeType, AttributeWithTranslations } from "./types";

export const AttributeContext = createContext<{
    attributePromise: Promise<AttributeWithTranslations> | undefined,
    attributeTypesPromise: Promise<AttributeType[]> | undefined
} | undefined>(undefined);
