"use server"

import { apiFetch } from "@/lib/api-client";

import { Attribute, AttributeType } from "@/features/attributes";
import { attributeSchema } from "@/features/attributes/schemas";

import * as z from "zod";

export async function deleteAttribute(attributeId: Attribute['id']): Promise<{ id: Attribute['id'] }> {
    return await apiFetch(`/attributes/${attributeId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createAttribute(data: z.infer<typeof attributeSchema>) {
    return await apiFetch(`/attributes`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateAttribute(data: z.infer<typeof attributeSchema>, id: Attribute['id']) {
    return await apiFetch(`/attributes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchAttributeTypesListForSelect({ locale }: { locale: string }): Promise<AttributeType[]> {
    return await apiFetch(`/${locale}/attribute-types/select`, {}).then(res => res.json());
}

export async function fetchAttributesListForSelect({ locale }: { locale: string }): Promise<Attribute[]> {
    return await apiFetch(`/${locale}/attributes/select`, {}).then(res => res.json());
}

export async function fetchAttributeValuesByModel({ locale, modelId, modelType }: { locale: string, modelId: number, modelType: string }): Promise<any> {
    return await apiFetch(`/${locale}/attribute-values/select/${modelType}/${modelId}`, {}).then(res => res.json());
}