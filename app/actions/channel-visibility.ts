"use server"

import { ExistingChannelVisibility, VisibilityReport } from "@/features/channels/types";

export async function fetchChannelVisibilitiesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<ExistingChannelVisibility[]> {
    return await fetch(`${process.env.API_URL}/${locale}/channel-visibilities/select/${modelType}/${modelId}`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}

export async function fetchVisibilityReport({ locale, modelId, modelType, channelId }: { locale: string, modelId: number, modelType: string, channelId: number }): Promise<VisibilityReport> {
    return await fetch(`${process.env.API_URL}/${locale}/channel-visibilities/report/${modelType}/${modelId}/${channelId}`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
