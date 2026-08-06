"use server"

import { Collection, CollectionSelectItem } from "@/features/collections"
import { collectionSchema } from "@/features/collections/schemas"

import * as z from "zod";

export async function deleteCollection(collectionId: Collection['id']): Promise<{ id: Collection['id'] }> {
    return await fetch(`${process.env.API_URL}/collections/${collectionId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createCollection(data: z.infer<typeof collectionSchema>) {
    return await fetch(`${process.env.API_URL}/collections`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateCollection(data: z.infer<typeof collectionSchema>, id: Collection['id']) {
    return await fetch(`${process.env.API_URL}/collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchCollectionsListForSelect({ locale }: { locale: string }): Promise<CollectionSelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/collections/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
