export type Model = {
    id: number | string;
    name: string;
    slug: string;
    created_at: string;
}

export type ModelWithTranslations<T extends Translation> = {
    id: number;
    created_at: string;
    updated_at: string;
    translations: Record<string, T>;
}

export type Translation = {
    id: number;
    locale: string;
    name: string;
    slug: string;
}

export type SelectItem = {
    id: number;
    name: string;
}