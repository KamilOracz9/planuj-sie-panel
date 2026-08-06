"use server"

import { Brand, BrandSelectItem } from "@/features/brands"
import { brandSchema } from "@/features/brands/schemas"

import * as z from "zod";

export async function deleteBrand(brandId: Brand['id']): Promise<{ id: Brand['id'] }> {
    return await fetch(`${process.env.API_URL}/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createBrand(data: z.infer<typeof brandSchema>) {
    return await fetch(`${process.env.API_URL}/brands`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateBrand(data: z.infer<typeof brandSchema>, id: Brand['id']) {
    return await fetch(`${process.env.API_URL}/brands/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchBrandsListForSelect({ locale }: { locale: string }): Promise<BrandSelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/brands/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}