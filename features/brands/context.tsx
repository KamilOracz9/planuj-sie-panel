"use client";

import { createContext, use, useContext } from "react";
import { BrandWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes/types";
import { ExistingChannelVisibility } from "../channels/types";
import { routing } from "@/lib/i18n/routing";
import { useAppSelector } from "@/lib/redux/hooks";

export const BrandContext = createContext<{
    brandPromise: Promise<BrandWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]>,
    existingChannelsPromise: Promise<ExistingChannelVisibility[]>,
} | undefined>(undefined);

export const useBrand = () => {
    const ctx = useContext(BrandContext);
    const { channelsSelect } = useAppSelector(state => state.channel);
    const brand = ctx?.brandPromise ? use(ctx.brandPromise) : {} as BrandWithTranslations;
    const existingAttributes = ctx?.existingAttributesPromise ? use(ctx.existingAttributesPromise) : [] as ExistingAttributeValue[];
    const existingChannels = ctx?.existingChannelsPromise ? use(ctx.existingChannelsPromise) : [] as ExistingChannelVisibility[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, brand.translations ? brand.translations[locale as keyof typeof brand.translations]?.name : undefined]));

    const defaultAttributes = existingAttributes?.map(av => ({
        id: av.id,
        attribute_id: String(av.attribute_id),
        data: av.data,
    })) ?? [];

    const defaultChannels = channelsSelect.map(channel => ({
        channel_id: channel.id,
        is_enabled: existingChannels.find(v => v.channel_id === channel.id)?.is_enabled ?? true,
    }));

    return {
        ...ctx,
        brand,
        existingAttributes,
        defaultNameValues,
        defaultAttributes,
        channelsSelect,
        defaultChannels,
    };
};
