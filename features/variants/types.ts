export type Variant = {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    created_at: string;
}

export type VariantWithTranslations = {
    id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    translations: Record<string, VariantTranslation>;
}

export type VariantTranslation = {
    id: number;
    locale: string;
    name: string;
    slug: string;
}
