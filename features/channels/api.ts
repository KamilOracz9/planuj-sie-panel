import { Channel, ChannelSelectItem, ChannelWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchChannelsList = async ({ locale }: { locale: string }): Promise<Channel[]> => await apiFetch(`/${locale}/channels`, {}).then(res => res.json());

export const fetchChannel = async ({ locale, id }: { locale: string, id: Channel['id'] }): Promise<ChannelWithTranslations> => await apiFetch(`/${locale}/channels/${id}`, {}).then(res => res.json());

export const fetchChannelsListForSelect = async ({ locale }: { locale: string }): Promise<ChannelSelectItem[]> => await apiFetch(`/${locale}/channels/select`, {}).then(res => res.json());
