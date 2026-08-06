"use client";

import { createContext } from "react";
import { CategoryWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes";
import { ExistingChannelVisibility } from "../channels/types";

export const CategoryContext = createContext<{
    categoryPromise: Promise<CategoryWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]>,
    existingChannelsPromise: Promise<ExistingChannelVisibility[]>,
} | undefined>(undefined);
