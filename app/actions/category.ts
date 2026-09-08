"use server"

import { apiFetch } from "@/lib/api-client";

import { Category, CategorySelectItem } from "@/features/categories";
import { categorySchema } from "@/features/categories/schemas";
import * as z from "zod";

export async function deleteCategory(categoryId: Category['id']): Promise<{ id: Category['id'] }> {
    return await apiFetch(`/categories/${categoryId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
    return await apiFetch(`/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateCategory(data: z.infer<typeof categorySchema>, id: Category['id']) {
    return await apiFetch(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchCategoriesListForSelect({ locale }: { locale: string }): Promise<CategorySelectItem[]> {
    return await apiFetch(`/${locale}/categories/select`, {}).then(res => res.json());
}
