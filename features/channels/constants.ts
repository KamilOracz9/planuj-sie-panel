// Shared between the client-side ChannelSwitcher (sets it) and server
// components (app/[locale]/layout.tsx, entity list pages - read it via
// next/headers' cookies()) - keep both sides using this single name.
export const ACTIVE_CHANNEL_COOKIE = "active_channel";
