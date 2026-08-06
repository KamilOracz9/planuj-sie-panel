import { ModelWithTranslations, SelectItem, Translation, Model } from "../shared/types";

export type Channel = {} & Model;

export type ChannelSelectItem = {} & SelectItem;

export type ChannelWithTranslations = {} & ModelWithTranslations<ChannelTranslation>;

export type ChannelTranslation = {
    channel_id: number;
} & Translation

export type ExistingChannelVisibility = {
    channel_id: number;
    is_enabled: boolean;
}
