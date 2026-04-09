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

export async function createUser(formData: FormData) {
    return await fetch(`${process.env.API_URL}/users`, {
        method: 'POST',
        body: formData,
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
        }
    }).then(res => res.json())
}

export async function updateUser(data: User, id: User['id']) {
    return await fetch(`${process.env.API_URL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': process.env.API_KEY || '',
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}