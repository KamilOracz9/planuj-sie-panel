"use server"

import { apiFetch } from "@/lib/api-client";

import { Series, SeriesSelectItem } from "@/features/series"
import { seriesSchema } from "@/features/series/schemas"

import * as z from "zod";

export async function deleteSeries(seriesId: Series['id']): Promise<{ id: Series['id'] }> {
    return await apiFetch(`/series/${seriesId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createSeries(data: z.infer<typeof seriesSchema>) {
    return await apiFetch(`/series`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateSeries(data: z.infer<typeof seriesSchema>, id: Series['id']) {
    return await apiFetch(`/series/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function fetchSeriesListForSelect({ locale }: { locale: string }): Promise<SeriesSelectItem[]> {
    return await apiFetch(`/${locale}/series/select`, {}).then(res => res.json());
}
