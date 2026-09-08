"use server"

import { apiFetch } from "@/lib/api-client";

import { Collection, CollectionSelectItem } from "@/features/collections"
import { collectionSchema } from "@/features/collections/schemas"

import * as z from "zod";

export async function deleteCollection(collectionId: Collection['id']): Promise<{ id: Collection['id'] }> {
    return await apiFetch(`/collections/${collectionId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createCollection(data: z.infer<typeof collectionSchema>) {
    return await apiFetch(`/collections`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateCollection(data: z.infer<typeof collectionSchema>, id: Collection['id']) {
    return await apiFetch(`/collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchCollectionsListForSelect({ locale }: { locale: string }): Promise<CollectionSelectItem[]> {
    return await apiFetch(`/${locale}/collections/select`, {}).then(res => res.json());
}
