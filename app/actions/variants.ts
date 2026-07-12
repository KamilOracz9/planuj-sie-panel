"use server"

import { Variant } from "@/features/variants";
import { variantSchema } from "@/features/variants/schemas";

import * as z from "zod";

export async function deleteVariant(variantId: Variant['id']): Promise<{ id: Variant['id'] }> {
    return await fetch(`${process.env.API_URL}/variants/${variantId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createVariant(data: z.infer<typeof variantSchema>) {
    return await fetch(`${process.env.API_URL}/variants`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateVariant(data: z.infer<typeof variantSchema>, id: Variant['id']) {
    return await fetch(`${process.env.API_URL}/variants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}