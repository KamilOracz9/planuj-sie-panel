"use client";

import { createContext, use, useContext, useMemo } from "react";
import { ProductWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes/types";
import { ExistingChannelVisibility } from "../channels/types";
import { ExistingPrice } from "../prices/types";
import { routing } from "@/lib/i18n/routing";
import { useAppSelector } from "@/lib/redux/hooks";

export const ProductContext = createContext<{
    productPromise: Promise<ProductWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]> | undefined,
    existingChannelsPromise: Promise<ExistingChannelVisibility[]> | undefined,
    existingPricesPromise: Promise<ExistingPrice[]> | undefined,
} | undefined>(undefined);

export const useProduct = () => {
    const ctx = useContext(ProductContext);
    const { brandsSelect } = useAppSelector(state => state.brand);
    const { seriesSelect } = useAppSelector(state => state.series);
    const { collectionsSelect } = useAppSelector(state => state.collection);
    const { channelsSelect } = useAppSelector(state => state.channel);
    const product = ctx?.productPromise ? use(ctx.productPromise) : {} as ProductWithTranslations;
    const existingAttributes = ctx?.existingAttributesPromise ? use(ctx.existingAttributesPromise) : [] as ExistingAttributeValue[];
    const existingChannels = ctx?.existingChannelsPromise ? use(ctx.existingChannelsPromise) : [] as ExistingChannelVisibility[];
    // No fallback for prices (unlike defaultChannels below): a price row only
    // exists for explicit (channel, currency) pairs, so the default value is
    // exactly the existing rows, not merged against "all channels x all currencies".
    const defaultPrices = ctx?.existingPricesPromise ? use(ctx.existingPricesPromise) : [] as ExistingPrice[];

    const selectedBrand = useMemo(() => brandsSelect.find(b => b.id === product.brand_id), [brandsSelect, product.brand_id]);
    const selectedSeries = useMemo(() => seriesSelect.find(s => s.id === product.series_id), [seriesSelect, product.series_id]);

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, product.translations ? product.translations[locale as keyof typeof product.translations]?.name : undefined]));

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
        product,
        existingAttributes,
        defaultNameValues,
        defaultAttributes,
        defaultChannels,
        defaultPrices,
        brandsSelect,
        seriesSelect,
        collectionsSelect,
        channelsSelect,
        selectedBrand,
        selectedSeries,
    };
};
