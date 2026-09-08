import { Collection, CollectionSelectItem, CollectionWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchCollectionsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Collection[]> => await apiFetch(`/${locale}/collections${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());

export const fetchCollection = async ({ locale, id }: { locale: string, id: Collection['id'] }): Promise<CollectionWithTranslations> => await apiFetch(`/${locale}/collections/${id}`, {}).then(res => res.json());

export const fetchCollectionsListForSelect = async ({ locale }: { locale: string }): Promise<CollectionSelectItem[]> => await apiFetch(`/${locale}/collections/select`, {}).then(res => res.json());
