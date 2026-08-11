import { Variant, VariantWithTranslations } from "./types";

export const fetchVariantsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Variant[]> => await fetch(`${process.env.API_URL}/${locale}/variants${channelId ? `?channel_id=${channelId}` : ''}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchVariant = async ({ locale, id }: { locale: string, id: Variant['id'] }): Promise<VariantWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/variants/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
