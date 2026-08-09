import { createSlice } from '@reduxjs/toolkit';
import { CurrencySelectItem } from '../types';

export const CURRENCY_SLICE_NAME = 'currency' as const;

export interface CurrencyState {
    currenciesSelect: CurrencySelectItem[],
}

const currencySlice = createSlice({
    name: CURRENCY_SLICE_NAME,
    initialState: {} as CurrencyState,
    reducers: {

    },
});

export const { actions: currencyActions, reducer: currencyReducer } = currencySlice;
