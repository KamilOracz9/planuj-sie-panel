"use server"

import { apiFetch } from "@/lib/api-client";

import { Product } from "@/features/products";
import { productSchema } from "@/features/products/schemas";

import * as z from "zod";

export async function deleteProduct(productId: Product['id']): Promise<{ id: Product['id'] }> {
    return await apiFetch(`/products/${productId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createProduct(data: z.infer<typeof productSchema>) {
    return await apiFetch(`/products`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateProduct(data: z.infer<typeof productSchema>, id: Product['id']) {
    return await apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

import { ProductSelectItem } from "@/features/products/types";

export async function fetchProductsListForSelect({ locale }: { locale: string }): Promise<ProductSelectItem[]> {
    return await apiFetch(`/${locale}/products/select`, {}).then(res => res.json());
}