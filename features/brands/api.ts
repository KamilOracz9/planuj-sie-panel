import { Brand, BrandWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchBrandsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Brand[]> => await apiFetch(`/${locale}/brands${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());

export const fetchBrand = async ({ locale, id }: { locale: string, id: Brand['id'] }): Promise<BrandWithTranslations> => await apiFetch(`/${locale}/brands/${id}`, {}).then(res => res.json());
