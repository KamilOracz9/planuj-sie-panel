import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelSelectItem } from '../types';

export const CHANNEL_SLICE_NAME = 'channel' as const;

export interface ChannelState {
    channelsSelect: ChannelSelectItem[],
    // The panel-wide "active channel" scope (see ChannelSwitcher) - null
    // means "all channels". Seeded server-side from the `active_channel`
    // cookie (see app/[locale]/layout.tsx) so it's already correct on first
    // paint, then kept in sync client-side by ChannelSwitcher.
    activeChannelId: number | null,
}

const channelSlice = createSlice({
    name: CHANNEL_SLICE_NAME,
    initialState: {} as ChannelState,
    reducers: {
        setActiveChannelId: (state, action: PayloadAction<number | null>) => {
            state.activeChannelId = action.payload;
        },
    },
});

export const { actions: channelActions, reducer: channelReducer } = channelSlice;
