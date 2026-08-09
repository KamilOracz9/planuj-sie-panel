import { Collection, CollectionSelectItem, CollectionWithTranslations } from "./types";

export const fetchCollectionsList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Collection[]> => await fetch(`${process.env.API_URL}/${locale}/collections${channelId ? `?channel_id=${channelId}` : ''}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchCollection = async ({ locale, id }: { locale: string, id: Collection['id'] }): Promise<CollectionWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/collections/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchCollectionsListForSelect = async ({ locale }: { locale: string }): Promise<CollectionSelectItem[]> => await fetch(`${process.env.API_URL}/${locale}/collections/select`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
