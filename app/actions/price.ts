"use server"

import { apiFetch } from "@/lib/api-client";

import { ExistingPrice } from "@/features/prices/types";

export async function fetchPricesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<ExistingPrice[]> {
    return await apiFetch(`/${locale}/prices/select/${modelType}/${modelId}`, {}).then(res => res.json());
}
