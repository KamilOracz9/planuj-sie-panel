import { createSlice } from '@reduxjs/toolkit';
import { MediaCollectionSelectItem } from '../types';

export const MEDIA_COLLECTION_SLICE_NAME = 'mediaCollection' as const;

export interface MediaCollectionState {
    mediaCollectionsSelect: MediaCollectionSelectItem[],
}

const mediaCollectionSlice = createSlice({
    name: MEDIA_COLLECTION_SLICE_NAME,
    initialState: {} as MediaCollectionState,
    reducers: {

    },
});

export const { actions: mediaCollectionActions, reducer: mediaCollectionReducer } = mediaCollectionSlice;
