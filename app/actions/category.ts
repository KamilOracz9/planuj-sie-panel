"use server"

import { Category } from "@/features/categories";
import { categorySchema } from "@/features/categories/schemas";
import * as z from "zod";

export async function deleteCategory(categoryId: Category['id']): Promise<{ id: Category['id'] }> {
    return await fetch(`${process.env.API_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
    return await fetch(`${process.env.API_URL}/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateCategory(data: z.infer<typeof categorySchema>, id: Category['id']) {
    return await fetch(`${process.env.API_URL}/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}