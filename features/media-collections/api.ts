import { MediaCollection, MediaCollectionSelectItem } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchMediaCollectionsList = async ({ locale }: { locale: string }): Promise<MediaCollection[]> => await apiFetch(`/${locale}/media-collections`, {}).then(res => res.json());

export const fetchMediaCollection = async ({ locale, id }: { locale: string, id: MediaCollection['id'] }): Promise<MediaCollection> => await apiFetch(`/${locale}/media-collections/${id}`, {}).then(res => res.json());

export const fetchMediaCollectionsListForSelect = async ({ locale }: { locale: string }): Promise<MediaCollectionSelectItem[]> => await apiFetch(`/${locale}/media-collections/select`, {}).then(res => res.json());
