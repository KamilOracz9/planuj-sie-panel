"use server"

import { ExistingPrice } from "@/features/prices/types";

export async function fetchPricesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<ExistingPrice[]> {
    return await fetch(`${process.env.API_URL}/${locale}/prices/select/${modelType}/${modelId}`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
