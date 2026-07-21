import { createSlice } from '@reduxjs/toolkit';
import { Attribute } from '../types';

export const ATTRIBUTE_SLICE_NAME = 'attribute' as const;

export interface AttributeState {
    attributesSelect: Attribute[],
}

const attributeSlice = createSlice({
    name: ATTRIBUTE_SLICE_NAME,
    initialState: {} as AttributeState,
    reducers: {

    },
});

export const { actions: attributeActions, reducer: attributeReducer } = attributeSlice;