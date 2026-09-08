"use server"

import { apiFetch } from "@/lib/api-client";

import { ExistingChannelVisibility, VisibilityReport } from "@/features/channels/types";

export async function fetchChannelVisibilitiesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<ExistingChannelVisibility[]> {
    return await apiFetch(`/${locale}/channel-visibilities/select/${modelType}/${modelId}`, {}).then(res => res.json());
}

export async function fetchVisibilityReport({ locale, modelId, modelType, channelId }: { locale: string, modelId: number, modelType: string, channelId: number }): Promise<VisibilityReport> {
    return await apiFetch(`/${locale}/channel-visibilities/report/${modelType}/${modelId}/${channelId}`, {}).then(res => res.json());
}
