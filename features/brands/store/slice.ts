import { createSlice } from '@reduxjs/toolkit';
import { BrandSelectItem } from '../types';

export const BRAND_SLICE_NAME = 'brand' as const;

export interface BrandState {
    brandsSelect: BrandSelectItem[],
}

const brandSlice = createSlice({
    name: BRAND_SLICE_NAME,
    initialState: {} as BrandState,
    reducers: {

    },
});

export const { actions: brandActions, reducer: brandReducer } = brandSlice;
