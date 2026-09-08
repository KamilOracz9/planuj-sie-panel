"use server"

import { apiFetch } from "@/lib/api-client";

import { Variant } from "@/features/variants";
import { variantSchema } from "@/features/variants/schemas";

import * as z from "zod";

export async function deleteVariant(variantId: Variant['id']): Promise<{ id: Variant['id'] }> {
    return await apiFetch(`/variants/${variantId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createVariant(data: z.infer<typeof variantSchema>) {
    return await apiFetch(`/variants`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateVariant(data: z.infer<typeof variantSchema>, id: Variant['id']) {
    return await apiFetch(`/variants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}