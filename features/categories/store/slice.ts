import { createSlice } from '@reduxjs/toolkit';
import { CategorySelectItem } from '../types';

export const CATEGORY_SLICE_NAME = 'category' as const;

export interface CategoryState {
    categoriesSelect: CategorySelectItem[],
}

const categorySlice = createSlice({
    name: CATEGORY_SLICE_NAME,
    initialState: {} as CategoryState,
    reducers: {

    },
});

export const { actions: categoryActions, reducer: categoryReducer } = categorySlice;