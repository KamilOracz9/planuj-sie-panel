import { Brand, BrandWithTranslations } from "./types";

export const fetchBrandsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Brand[]> => await fetch(`${process.env.API_URL}/${locale}/brands${channelId ? `?channel_id=${channelId}` : ''}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchBrand = async ({ locale, id }: { locale: string, id: Brand['id'] }): Promise<BrandWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/brands/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
