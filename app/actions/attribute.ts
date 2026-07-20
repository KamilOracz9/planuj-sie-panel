"use server"

import { Attribute, AttributeType } from "@/features/attributes";
import { attributeSchema } from "@/features/attributes/schemas";

import * as z from "zod";

export async function deleteAttribute(attributeId: Attribute['id']): Promise<{ id: Attribute['id'] }> {
    return await fetch(`${process.env.API_URL}/attributes/${attributeId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createAttribute(data: z.infer<typeof attributeSchema>) {
    return await fetch(`${process.env.API_URL}/attributes`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateAttribute(data: z.infer<typeof attributeSchema>, id: Attribute['id']) {
    return await fetch(`${process.env.API_URL}/attributes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchAttributeTypesListForSelect({ locale }: { locale: string }): Promise<AttributeType[]> {
    return await fetch(`${process.env.API_URL}/${locale}/attribute-types/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}

export async function fetchAttributesListForSelect({ locale }: { locale: string }): Promise<Attribute[]> {
    return await fetch(`${process.env.API_URL}/${locale}/attributes/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}

export async function fetchAttributeValuesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<any> {
    return await fetch(`${process.env.API_URL}/${locale}/attribute-values/select/${modelType}/${modelId}`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}