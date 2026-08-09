"use client";

import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { channelActions } from "../store/slice";
import { ACTIVE_CHANNEL_COOKIE } from "../constants";

// The panel-wide "active channel" scope: once set, list pages (Products,
// Brands, Series, Collections, Categories - see BaseQueryBuilder::filterByChannel)
// only show items visible in that channel, and channel-scoped tabs (Prices,
// Media) on an entity's own edit form act only on that channel. Persisted in
// a plain (non-httpOnly) cookie so server components can read it too, kept
// in sync with Redux's activeChannelId for instant client reactivity.
const ChannelSwitcher = () => {
    const tShared = useTranslations("Shared");
    const dispatch = useAppDispatch();
    const { channelsSelect, activeChannelId } = useAppSelector(state => state.channel);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const channelId = value ? Number(value) : null;

        if (channelId) {
            document.cookie = `${ACTIVE_CHANNEL_COOKIE}=${channelId}; path=/; max-age=31536000`;
        } else {
            document.cookie = `${ACTIVE_CHANNEL_COOKIE}=; path=/; max-age=0`;
        }

        dispatch(channelActions.setActiveChannelId(channelId));
        // A full reload, not router.refresh(): server components (entity
        // list pages) read the cookie themselves, and Next's client-side
        // Router Cache can otherwise still serve an RSC payload fetched
        // before the cookie changed.
        window.location.reload();
    };

    return (
        <select
            value={activeChannelId ?? ""}
            onChange={handleChange}
            className="w-full h-8 rounded-md border border-input bg-background px-2 text-sm"
        >
            <option value="">{tShared("channel-switcher.all-channels")}</option>
            {channelsSelect.map((channel) => (
                <option key={channel.id} value={channel.id}>{channel.name}</option>
            ))}
        </select>
    );
};

export default ChannelSwitcher;
