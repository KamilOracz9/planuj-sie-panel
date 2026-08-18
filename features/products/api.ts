import { Product, ProductWithTranslations } from "./types";
import { PriceBreakdown } from "../prices/types";

export const fetchProductsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Product[]> => await fetch(`${process.env.API_URL}/${locale}/products${channelId ? `?channel_id=${channelId}` : ''}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchProduct = async ({ locale, id }: { locale: string, id: Product['id'] }): Promise<ProductWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/products/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchProductPriceBreakdown = async ({ locale, id, channelId }: { locale: string, id: Product['id'], channelId?: number | null }): Promise<PriceBreakdown> => await fetch(`${process.env.API_URL}/${locale}/products/${id}/price-breakdown${channelId ? `?channel_id=${channelId}` : ''}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
