import { UsersListResponseType } from "./types";

export const fetchUsersList = async (): Promise<UsersListResponseType[]> => await fetch(`${process.env.API_URL}/users`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json())