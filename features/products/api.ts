import { Product, ProductWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";
import { PriceBreakdown } from "../prices/types";

export const fetchProductsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Product[]> => await apiFetch(`/${locale}/products${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());

export const fetchProduct = async ({ locale, id }: { locale: string, id: Product['id'] }): Promise<ProductWithTranslations> => await apiFetch(`/${locale}/products/${id}`, {}).then(res => res.json());

export const fetchProductPriceBreakdown = async ({ locale, id, channelId }: { locale: string, id: Product['id'], channelId?: number | null }): Promise<PriceBreakdown> => await apiFetch(`/${locale}/products/${id}/price-breakdown${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());
