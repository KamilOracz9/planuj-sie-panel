"use server"

import { Brand } from "@/features/brands"

export async function deleteBrand(brandId: Brand['id']): Promise<{id: Brand['id']}> {
    return await fetch(`${process.env.API_URL}/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createBrand(data: object) {
    return await fetch(`${process.env.API_URL}/brands`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateBrand(data: object, id: Brand['id']) {
    return await fetch(`${process.env.API_URL}/brands/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}