"use server"

import { apiFetch } from "@/lib/api-client";

import { Brand, BrandSelectItem } from "@/features/brands"
import { brandSchema } from "@/features/brands/schemas"

import * as z from "zod";

export async function deleteBrand(brandId: Brand['id']): Promise<{ id: Brand['id'] }> {
    return await apiFetch(`/brands/${brandId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createBrand(data: z.infer<typeof brandSchema>) {
    return await apiFetch(`/brands`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateBrand(data: z.infer<typeof brandSchema>, id: Brand['id']) {
    return await apiFetch(`/brands/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchBrandsListForSelect({ locale }: { locale: string }): Promise<BrandSelectItem[]> {
    return await apiFetch(`/${locale}/brands/select`, {}).then(res => res.json());
}