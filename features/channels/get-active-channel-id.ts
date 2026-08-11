import { cookies } from "next/headers";
import { ACTIVE_CHANNEL_COOKIE } from "./constants";
import { fetchChannelsListForSelect } from "./api";

// Server-side equivalent of the Redux activeChannelId computed in
// app/[locale]/layout.tsx: the panel's global channel scope, read from the
// active_channel cookie, falling back to whichever Channel has is_default
// when no cookie has been set yet (first visit) - entity list pages
// (Products/Brands/Series/Collections/Categories) use this so their
// server-rendered filtering matches what the sidebar ChannelSwitcher shows
// as selected, instead of silently defaulting to "all channels".
export async function getActiveChannelId(locale: string): Promise<number | null> {
    const cookieValue = Number((await cookies()).get(ACTIVE_CHANNEL_COOKIE)?.value);

    if (cookieValue) {
        return cookieValue;
    }

    const channelsSelect = await fetchChannelsListForSelect({ locale });

    return channelsSelect.find(channel => channel.is_default)?.id ?? null;
}
