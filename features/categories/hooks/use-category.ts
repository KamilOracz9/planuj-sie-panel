import { useContext, useMemo } from "react";
import { CategoryContext } from "../context";
import { useAppSelector } from "@/lib/redux/hooks";
import { use } from "react";
import { routing } from "@/lib/i18n/routing";
import { CategoryWithTranslations } from "../types";
import { ExistingAttributeValue } from "@/features/attributes/types";
import { ExistingChannelVisibility } from "@/features/channels/types";

const useCategory = () => {
    const categoryCtx = useContext(CategoryContext);
    const { categoriesSelect } = useAppSelector(state => state.category);
    const { channelsSelect } = useAppSelector(state => state.channel);
    const category = categoryCtx?.categoryPromise ? use(categoryCtx.categoryPromise) : {} as CategoryWithTranslations;
    const selectedParentCategory = useMemo(() => categoriesSelect.find(c => c.id === category.parent_id), [categoriesSelect, category.parent_id]);
    const existingAttributes = categoryCtx?.existingAttributesPromise ? use(categoryCtx.existingAttributesPromise) : [] as ExistingAttributeValue[];
    const existingChannels = categoryCtx?.existingChannelsPromise ? use(categoryCtx.existingChannelsPromise) : [] as ExistingChannelVisibility[];

    const defaultNameValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.name ?? undefined]));
    const defaultDescriptionValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.description ?? undefined]));
    const defaultShortDescriptionValues = Object.fromEntries(routing.locales.map(locale => [locale, category.translations?.[locale as keyof typeof category.translations]?.short_description ?? undefined]));

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
        ...categoryCtx,
        categoriesSelect,
        selectedParentCategory,
        defaultNameValues,
        defaultDescriptionValues,
        defaultShortDescriptionValues,
        category,
        existingAttributes,
        defaultAttributes,
        channelsSelect,
        defaultChannels,
    };
}

export default useCategory