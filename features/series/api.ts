import { Series, SeriesSelectItem, SeriesWithTranslations } from "./types";

export const fetchSeriesList = async ({ locale }: { locale: string }): Promise<Series[]> => await fetch(`${process.env.API_URL}/${locale}/series`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchSeries = async ({ locale, id }: { locale: string, id: Series['id'] }): Promise<SeriesWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/series/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchSeriesListForSelect = async ({ locale }: { locale: string }): Promise<SeriesSelectItem[]> => await fetch(`${process.env.API_URL}/${locale}/series/select`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
