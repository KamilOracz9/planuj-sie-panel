import { createSlice } from '@reduxjs/toolkit';
import { ChannelSelectItem } from '../types';

export const CHANNEL_SLICE_NAME = 'channel' as const;

export interface ChannelState {
    channelsSelect: ChannelSelectItem[],
}

const channelSlice = createSlice({
    name: CHANNEL_SLICE_NAME,
    initialState: {} as ChannelState,
    reducers: {

    },
});

export const { actions: channelActions, reducer: channelReducer } = channelSlice;
