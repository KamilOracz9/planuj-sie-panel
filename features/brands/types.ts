export type Brand = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

export type BrandWithTranslations = {
    id: number;
    created_at: string;
    updated_at: string;
    translations: Record<string, BrandTranslation>;
}

export type BrandTranslation = {
    id: number;
    brand_id: number;
    locale: string;
    name: string;
    slug: string;
}
