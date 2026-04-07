import { User } from "./types";

export const fetchUsersList = async ({ locale }: { locale: string }): Promise<User[]> => await fetch(`${process.env.API_URL}/${locale}/users`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json())
