import { User } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchUsersList = async ({ locale }: { locale: string }): Promise<User[]> => await apiFetch(`/${locale}/users`, {}).then(res => res.json());

export const fetchUser = async ({ locale, id }: { locale: string, id: User['id'] }): Promise<User> => await apiFetch(`/${locale}/users/${id}`, {}).then(res => res.json());
