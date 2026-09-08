"use server"

import { Channel, ChannelSelectItem } from "@/features/channels"
import { channelSchema } from "@/features/channels/schemas"
import { apiFetch } from "@/lib/api-client"

import * as z from "zod";

export async function deleteChannel(channelId: Channel['id']): Promise<{ id: Channel['id'] }> {
    return await apiFetch(`/channels/${channelId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createChannel(data: z.infer<typeof channelSchema>) {
    return await apiFetch(`/channels`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateChannel(data: z.infer<typeof channelSchema>, id: Channel['id']) {
    return await apiFetch(`/channels/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchChannelsListForSelect({ locale }: { locale: string }): Promise<ChannelSelectItem[]> {
    return await apiFetch(`/${locale}/channels/select`, {}).then(res => res.json());
}
