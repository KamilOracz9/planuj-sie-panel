import { MediaCollection, MediaCollectionSelectItem } from "./types";

export const fetchMediaCollectionsList = async ({ locale }: { locale: string }): Promise<MediaCollection[]> => await fetch(`${process.env.API_URL}/${locale}/media-collections`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchMediaCollection = async ({ locale, id }: { locale: string, id: MediaCollection['id'] }): Promise<MediaCollection> => await fetch(`${process.env.API_URL}/${locale}/media-collections/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchMediaCollectionsListForSelect = async ({ locale }: { locale: string }): Promise<MediaCollectionSelectItem[]> => await fetch(`${process.env.API_URL}/${locale}/media-collections/select`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
