"use server"

import { ExistingChannelVisibility } from "@/features/channels/types";

export async function fetchChannelVisibilitiesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<ExistingChannelVisibility[]> {
    return await fetch(`${process.env.API_URL}/${locale}/channel-visibilities/select/${modelType}/${modelId}`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
