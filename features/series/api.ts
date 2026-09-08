import { Series, SeriesSelectItem, SeriesWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchSeriesList = async ({ locale, channelId }: { locale: string, channelId?: number | null }): Promise<Series[]> => await apiFetch(`/${locale}/series${channelId ? `?channel_id=${channelId}` : ''}`, {}).then(res => res.json());

export const fetchSeries = async ({ locale, id }: { locale: string, id: Series['id'] }): Promise<SeriesWithTranslations> => await apiFetch(`/${locale}/series/${id}`, {}).then(res => res.json());

export const fetchSeriesListForSelect = async ({ locale }: { locale: string }): Promise<SeriesSelectItem[]> => await apiFetch(`/${locale}/series/select`, {}).then(res => res.json());
