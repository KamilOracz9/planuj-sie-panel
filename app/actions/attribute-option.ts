"use server"

import { apiFetch } from "@/lib/api-client";

import { AttributeOption, AttributeOptionSelectItem, AttributeOptionWithTranslations } from "@/features/attributes";
import { attributeOptionSchema } from "@/features/attributes/schemas";

import * as z from "zod";

export async function deleteAttributeOption(attributeOptionId: AttributeOption['id']): Promise<{ id: AttributeOption['id'] }> {
    return await apiFetch(`/attribute-options/${attributeOptionId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createAttributeOption(data: z.infer<typeof attributeOptionSchema>) {
    return await apiFetch(`/attribute-options`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateAttributeOption(data: z.infer<typeof attributeOptionSchema>, id: AttributeOption['id']) {
    return await apiFetch(`/attribute-options/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchAttributeOptionsListForSelect({ locale, attributeId }: { locale: string, attributeId: number }): Promise<AttributeOptionSelectItem[]> {
    return await apiFetch(`/${locale}/attribute-options/select/${attributeId}`, {}).then(res => res.json());
}

// Server action (unlike features/attributes/api.ts's fetchAttributeOption):
// attribute-options.tsx is a client component and calling the plain api.ts
// version directly from the client would try to read process.env.API_URL in
// the browser, where it's undefined (no NEXT_PUBLIC_ prefix).
export async function fetchAttributeOption({ locale, id }: { locale: string, id: AttributeOption['id'] }): Promise<AttributeOptionWithTranslations> {
    return await apiFetch(`/${locale}/attribute-options/${id}`, {}).then(res => res.json());
}
