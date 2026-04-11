export type CategorySelectItem = {
    id: number;
    name: string;
}

export type Category = {
    id: number;
    name: string;
    slug: string;
    parent_name: string;
    created_at: string;
}

export type CategoryWithTranslations = {
    id: number;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
    translations: Record<string, CategoryTranslation>;
}

export type CategoryTranslation = {
    id: number;
    locale: string;
    name: string;
    slug: string;
    description: string | null;
    short_description: string | null;
}
