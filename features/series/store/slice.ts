import { createSlice } from '@reduxjs/toolkit';
import { SeriesSelectItem } from '../types';

export const SERIES_SLICE_NAME = 'series' as const;

export interface SeriesState {
    seriesSelect: SeriesSelectItem[],
}

const seriesSlice = createSlice({
    name: SERIES_SLICE_NAME,
    initialState: {} as SeriesState,
    reducers: {

    },
});

export const { actions: seriesActions, reducer: seriesReducer } = seriesSlice;
