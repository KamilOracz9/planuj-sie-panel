"use client";

import { createContext, use, useContext } from "react";
import { ChannelWithTranslations } from "./types";
import { routing } from "@/lib/i18n/routing";

export const ChannelContext = createContext<{
    channelPromise: Promise<ChannelWithTranslations> | undefined,
} | undefined>(undefined);

export const useChannel = () => {
    const ctx = useContext(ChannelContext);
    const channel = ctx?.channelPromise ? use(ctx.channelPromise) : {} as ChannelWithTranslations;

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, channel.translations ? channel.translations[locale as keyof typeof channel.translations]?.name : undefined]));

    return {
        ...ctx,
        channel,
        defaultNameValues,
    };
};
