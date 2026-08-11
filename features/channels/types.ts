import { ModelWithTranslations, SelectItem, Translation, Model } from "../shared/types";

export type Channel = { is_default: boolean } & Model;

export type ChannelSelectItem = { is_default: boolean } & SelectItem;

export type ChannelWithTranslations = { is_default: boolean } & ModelWithTranslations<ChannelTranslation>;

export type ChannelTranslation = {
    channel_id: number;
} & Translation

export type ExistingChannelVisibility = {
    channel_id: number;
    is_enabled: boolean;
}
