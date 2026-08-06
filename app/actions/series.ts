"use server"

import { Series, SeriesSelectItem } from "@/features/series"
import { seriesSchema } from "@/features/series/schemas"

import * as z from "zod";

export async function deleteSeries(seriesId: Series['id']): Promise<{ id: Series['id'] }> {
    return await fetch(`${process.env.API_URL}/series/${seriesId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function createSeries(data: z.infer<typeof seriesSchema>) {
    return await fetch(`${process.env.API_URL}/series`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateSeries(data: z.infer<typeof seriesSchema>, id: Series['id']) {
    return await fetch(`${process.env.API_URL}/series/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchSeriesListForSelect({ locale }: { locale: string }): Promise<SeriesSelectItem[]> {
    return await fetch(`${process.env.API_URL}/${locale}/series/select`, {
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json());
}
