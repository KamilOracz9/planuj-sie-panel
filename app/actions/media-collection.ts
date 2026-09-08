"use server"

import { apiFetch } from "@/lib/api-client";

import { MediaCollection, MediaCollectionSelectItem } from "@/features/media-collections"
import { mediaCollectionSchema } from "@/features/media-collections/schemas"

import * as z from "zod";

export async function deleteMediaCollection(mediaCollectionId: MediaCollection['id']): Promise<{ id: MediaCollection['id'] }> {
    return await apiFetch(`/media-collections/${mediaCollectionId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createMediaCollection(data: z.infer<typeof mediaCollectionSchema>) {
    return await apiFetch(`/media-collections`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateMediaCollection(data: z.infer<typeof mediaCollectionSchema>, id: MediaCollection['id']) {
    return await apiFetch(`/media-collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchMediaCollectionsListForSelect({ locale }: { locale: string }): Promise<MediaCollectionSelectItem[]> {
    return await apiFetch(`/${locale}/media-collections/select`, {}).then(res => res.json());
}
