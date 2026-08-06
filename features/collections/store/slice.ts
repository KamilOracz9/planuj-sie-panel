import { createSlice } from '@reduxjs/toolkit';
import { CollectionSelectItem } from '../types';

export const COLLECTION_SLICE_NAME = 'collection' as const;

export interface CollectionState {
    collectionsSelect: CollectionSelectItem[],
}

const collectionSlice = createSlice({
    name: COLLECTION_SLICE_NAME,
    initialState: {} as CollectionState,
    reducers: {

    },
});

export const { actions: collectionActions, reducer: collectionReducer } = collectionSlice;
