import { Channel, ChannelSelectItem, ChannelWithTranslations } from "./types";

export const fetchChannelsList = async ({ locale }: { locale: string }): Promise<Channel[]> => await fetch(`${process.env.API_URL}/${locale}/channels`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchChannel = async ({ locale, id }: { locale: string, id: Channel['id'] }): Promise<ChannelWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/channels/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchChannelsListForSelect = async ({ locale }: { locale: string }): Promise<ChannelSelectItem[]> => await fetch(`${process.env.API_URL}/${locale}/channels/select`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
