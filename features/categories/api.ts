import { Category, CategorySelectItem, CategoryWithTranslations } from "./types";

export const fetchCategoriesList = async ({ locale }: { locale: string }): Promise<Category[]> => await fetch(`${process.env.API_URL}/${locale}/categories`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchCategory = async ({ locale, id }: { locale: string, id: Category['id'] }): Promise<CategoryWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/categories/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchCategoriesListForSelect = async ({ locale }: { locale: string }): Promise<CategorySelectItem[]> => await fetch(`${process.env.API_URL}/${locale}/categories/select`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

