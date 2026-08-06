"use server"

import { Channel, ChannelSelectItem } from "@/features/channels"
import { channelSchema } from "@/features/channels/schemas"

import * as z from "zod";

export async function deleteChannel(channelId: Channel['id']): Promise<{ id: Channel['id'] }> {
    return await fetch(`${process.env.API_URL}/channels/${channelId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createChannel(data: z.infer<typeof channelSchema>) {
    return await fetch(`${process.env.API_URL}/channels`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateChannel(data: z.infer<typeof channelSchema>, id: Channel['id']) {
    return await fetch(`${process.env.API_URL}/channels/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchChannelsListForSelect({ locale }: { locale: string }): Promise<ChannelSelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/channels/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
