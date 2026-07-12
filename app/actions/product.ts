"use server"

import { Product } from "@/features/products";
import { productSchema } from "@/features/products/schemas";

import * as z from "zod";

export async function deleteProduct(productId: Product['id']): Promise<{ id: Product['id'] }> {
    return await fetch(`${process.env.API_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createProduct(data: z.infer<typeof productSchema>) {
    return await fetch(`${process.env.API_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateProduct(data: z.infer<typeof productSchema>, id: Product['id']) {
    return await fetch(`${process.env.API_URL}/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

import { ProductSelectItem } from "@/features/products/types";

export async function fetchProductsListForSelect({ locale }: { locale: string }): Promise<ProductSelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/products/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}