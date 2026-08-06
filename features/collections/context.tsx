"use client";

import { createContext, use, useContext } from "react";
import { CollectionWithTranslations } from "./types";
import { ExistingAttributeValue } from "../attributes/types";
import { ExistingChannelVisibility } from "../channels/types";
import { routing } from "@/lib/i18n/routing";
import { useAppSelector } from "@/lib/redux/hooks";

export const CollectionContext = createContext<{
    collectionPromise: Promise<CollectionWithTranslations> | undefined,
    existingAttributesPromise: Promise<ExistingAttributeValue[]>,
    existingChannelsPromise: Promise<ExistingChannelVisibility[]>,
} | undefined>(undefined);

export const useCollection = () => {
    const ctx = useContext(CollectionContext);
    const { channelsSelect } = useAppSelector(state => state.channel);
    const collection = ctx?.collectionPromise ? use(ctx.collectionPromise) : {} as CollectionWithTranslations;
    const existingAttributes = ctx?.existingAttributesPromise ? use(ctx.existingAttributesPromise) : [] as ExistingAttributeValue[];
    const existingChannels = ctx?.existingChannelsPromise ? use(ctx.existingChannelsPromise) : [] as ExistingChannelVisibility[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, collection.translations ? collection.translations[locale as keyof typeof collection.translations]?.name : undefined]));

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
        collection,
        existingAttributes,
        defaultNameValues,
        defaultAttributes,
        channelsSelect,
        defaultChannels,
    };
};
