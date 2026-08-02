"use server"

import { MediaFolder, MediaFolderType, MediaItem, MediaModelType } from "@/features/media/types";

const headers = () => ({
    'X-API-KEY': process.env.API_KEY || '',
    'Accept': 'application/json',
});

export async function fetchGalleryMedia(folderId?: number | null): Promise<MediaItem[]> {
    const query = folderId ? `?folder_id=${folderId}` : '';
    return await fetch(`${process.env.API_URL}/gallery${query}`, {
        headers: headers(),
    }).then(res => res.json());
}

export async function uploadGalleryMedia(formData: FormData): Promise<MediaItem[]> {
    return await fetch(`${process.env.API_URL}/gallery`, {
        method: 'POST',
        body: formData,
        headers: headers(),
    }).then(res => res.json());
}

export async function deleteGalleryMedia(mediaId: MediaItem['id']): Promise<{ id: MediaItem['id'] }> {
    return await fetch(`${process.env.API_URL}/gallery/${mediaId}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(res => res.json());
}

export async function moveGalleryMedia(mediaId: MediaItem['id'], folderId: number | null): Promise<MediaItem> {
    return await fetch(`${process.env.API_URL}/gallery/${mediaId}/move`, {
        method: 'POST',
        body: JSON.stringify({ folder_id: folderId }),
        headers: {
            ...headers(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function fetchDocumentLibrary(folderId?: number | null): Promise<MediaItem[]> {
    const query = folderId ? `?folder_id=${folderId}` : '';
    return await fetch(`${process.env.API_URL}/documents${query}`, {
        headers: headers(),
    }).then(res => res.json());
}

export async function uploadDocumentLibrary(formData: FormData): Promise<MediaItem[]> {
    return await fetch(`${process.env.API_URL}/documents`, {
        method: 'POST',
        body: formData,
        headers: headers(),
    }).then(res => res.json());
}

export async function deleteDocumentLibrary(mediaId: MediaItem['id']): Promise<{ id: MediaItem['id'] }> {
    return await fetch(`${process.env.API_URL}/documents/${mediaId}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(res => res.json());
}

export async function moveDocumentLibrary(mediaId: MediaItem['id'], folderId: number | null): Promise<MediaItem> {
    return await fetch(`${process.env.API_URL}/documents/${mediaId}/move`, {
        method: 'POST',
        body: JSON.stringify({ folder_id: folderId }),
        headers: {
            ...headers(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function fetchMediaFolders(type: MediaFolderType): Promise<MediaFolder[]> {
    return await fetch(`${process.env.API_URL}/folders/${type}`, {
        headers: headers(),
    }).then(res => res.json());
}

export async function createMediaFolder(type: MediaFolderType, name: string, parentId: number | null): Promise<MediaFolder> {
    return await fetch(`${process.env.API_URL}/folders/${type}`, {
        method: 'POST',
        body: JSON.stringify({ name, parent_id: parentId }),
        headers: {
            ...headers(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function updateMediaFolder(type: MediaFolderType, id: number, parentId: number | null): Promise<MediaFolder> {
    return await fetch(`${process.env.API_URL}/folders/${type}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ parent_id: parentId }),
        headers: {
            ...headers(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function deleteMediaFolder(type: MediaFolderType, id: number): Promise<{ id: number }> {
    return await fetch(`${process.env.API_URL}/folders/${type}/${id}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(res => res.json());
}

export async function fetchModelMedia<T>(modelType: MediaModelType, id: number): Promise<T> {
    return await fetch(`${process.env.API_URL}/${modelType}/${id}/media`, {
        headers: headers(),
    }).then(res => res.json());
}

export async function uploadModelMedia(modelType: MediaModelType, id: number, formData: FormData): Promise<MediaItem[]> {
    return await fetch(`${process.env.API_URL}/${modelType}/${id}/media`, {
        method: 'POST',
        body: formData,
        headers: headers(),
    }).then(res => res.json());
}

export async function deleteModelMedia(modelType: MediaModelType, id: number, mediaId: MediaItem['id']): Promise<{ id: MediaItem['id'] }> {
    return await fetch(`${process.env.API_URL}/${modelType}/${id}/media/${mediaId}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(res => res.json());
}

export async function attachModelMedia(modelType: MediaModelType, id: number, collection: string, mediaId: MediaItem['id']): Promise<MediaItem> {
    return await fetch(`${process.env.API_URL}/${modelType}/${id}/media/attach`, {
        method: 'POST',
        body: JSON.stringify({ collection, media_id: mediaId }),
        headers: {
            ...headers(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function reorderModelMedia(modelType: MediaModelType, id: number, collection: string, ids: number[]): Promise<{ ids: number[] }> {
    return await fetch(`${process.env.API_URL}/${modelType}/${id}/media/reorder`, {
        method: 'POST',
        body: JSON.stringify({ collection, ids }),
        headers: {
            ...headers(),
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}
