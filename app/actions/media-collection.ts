"use server"

import { MediaCollection, MediaCollectionSelectItem } from "@/features/media-collections"
import { mediaCollectionSchema } from "@/features/media-collections/schemas"

import * as z from "zod";

export async function deleteMediaCollection(mediaCollectionId: MediaCollection['id']): Promise<{ id: MediaCollection['id'] }> {
    return await fetch(`${process.env.API_URL}/media-collections/${mediaCollectionId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createMediaCollection(data: z.infer<typeof mediaCollectionSchema>) {
    return await fetch(`${process.env.API_URL}/media-collections`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateMediaCollection(data: z.infer<typeof mediaCollectionSchema>, id: MediaCollection['id']) {
    return await fetch(`${process.env.API_URL}/media-collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchMediaCollectionsListForSelect({ locale }: { locale: string }): Promise<MediaCollectionSelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/media-collections/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
