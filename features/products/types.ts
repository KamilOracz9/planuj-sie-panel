export type ProductSelectItem = {
    id: number;
    name: string;
}

export type Product = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

export type ProductWithTranslations = {
    id: number;
    created_at: string;
    updated_at: string;
    translations: Record<string, ProductTranslation>;
}

export type ProductTranslation = {
    id: number;
    locale: string;
    name: string;
    slug: string;
}
