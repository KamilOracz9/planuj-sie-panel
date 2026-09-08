import { Category, CategorySelectItem, CategoryWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchCategoriesList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Category[]> => await apiFetch(`/${locale}/categories${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());

export const fetchCategory = async ({ locale, id }: { locale: string, id: Category['id'] }): Promise<CategoryWithTranslations> => await apiFetch(`/${locale}/categories/${id}`, {}).then(res => res.json());

export const fetchCategoriesListForSelect = async ({ locale }: { locale: string }): Promise<CategorySelectItem[]> => await apiFetch(`/${locale}/categories/select`, {}).then(res => res.json());

