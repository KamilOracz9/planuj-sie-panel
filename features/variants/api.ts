import { Variant, VariantWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchVariantsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Variant[]> => await apiFetch(`/${locale}/variants${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());

export const fetchVariant = async ({ locale, id }: { locale: string, id: Variant['id'] }): Promise<VariantWithTranslations> => await apiFetch(`/${locale}/variants/${id}`, {}).then(res => res.json());

export const fetchVariantsByProduct = async ({ locale, productId, channelId }: { locale: string, productId: number, channelId?: number | null }): Promise<Variant[]> => await apiFetch(`/${locale}/variants/by-product/${productId}${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());
