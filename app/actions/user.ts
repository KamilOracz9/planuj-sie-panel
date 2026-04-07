"use server"

import { User } from "@/features/users";

export async function deleteUser(userId: User['id']): Promise<{id: User['id']}> {
    return await fetch(`${process.env.API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}