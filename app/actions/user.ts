"use server"

import { apiFetch } from "@/lib/api-client";

import { User } from "@/features/users";

export async function deleteUser(userId: User['id']): Promise<{id: User['id']}> {
    return await apiFetch(`/users/${userId}`, {
        method: 'DELETE',
    }).then(res => res.json())
}

export async function createUser(data: User) {
    return await apiFetch(`/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export async function updateUser(data: User, id: User['id']) {
    return await apiFetch(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}