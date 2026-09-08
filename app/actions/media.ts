"use server"

import { MediaFolder, MediaFolderType, MediaItem, MediaModelType, ModelMediaByCollection, MediaCollectionAssignmentsByChannel } from "@/features/media/types";
import { apiFetch } from "@/lib/api-client";

export async function fetchGalleryMedia(folderId?: number | null): Promise<MediaItem[]> {
    const query = folderId ? `?folder_id=${folderId}` : '';
    return await apiFetch(`/gallery/images${query}`, {}).then(res => res.json());
}

export async function uploadGalleryMedia(formData: FormData): Promise<MediaItem[]> {
    return await apiFetch(`/gallery/images`, {
        method: 'POST',
        body: formData,
    }).then(res => res.json());
}

export async function deleteGalleryMedia(mediaId: MediaItem['id']): Promise<{ id: MediaItem['id'] }> {
    return await apiFetch(`/gallery/images/${mediaId}`, {
        method: 'DELETE',
    }).then(res => res.json());
}

export async function moveGalleryMedia(mediaId: MediaItem['id'], folderId: number | null): Promise<MediaItem> {
    return await apiFetch(`/gallery/images/${mediaId}/move`, {
        method: 'POST',
        body: JSON.stringify({ folder_id: folderId }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function fetchDocumentLibrary(folderId?: number | null): Promise<MediaItem[]> {
    const query = folderId ? `?folder_id=${folderId}` : '';
    return await apiFetch(`/gallery/documents${query}`, {}).then(res => res.json());
}

export async function uploadDocumentLibrary(formData: FormData): Promise<MediaItem[]> {
    return await apiFetch(`/gallery/documents`, {
        method: 'POST',
        body: formData,
    }).then(res => res.json());
}

export async function deleteDocumentLibrary(mediaId: MediaItem['id']): Promise<{ id: MediaItem['id'] }> {
    return await apiFetch(`/gallery/documents/${mediaId}`, {
        method: 'DELETE',
    }).then(res => res.json());
}

export async function moveDocumentLibrary(mediaId: MediaItem['id'], folderId: number | null): Promise<MediaItem> {
    return await apiFetch(`/gallery/documents/${mediaId}/move`, {
        method: 'POST',
        body: JSON.stringify({ folder_id: folderId }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function fetchMediaFolders(type: MediaFolderType): Promise<MediaFolder[]> {
    return await apiFetch(`/gallery/${type}/folders`, {}).then(res => res.json());
}

export async function createMediaFolder(type: MediaFolderType, name: string, parentId: number | null): Promise<MediaFolder> {
    return await apiFetch(`/gallery/${type}/folders`, {
        method: 'POST',
        body: JSON.stringify({ name, parent_id: parentId }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function updateMediaFolder(type: MediaFolderType, id: number, parentId: number | null): Promise<MediaFolder> {
    return await apiFetch(`/gallery/${type}/folders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ parent_id: parentId }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function deleteMediaFolder(type: MediaFolderType, id: number): Promise<{ id: number }> {
    return await apiFetch(`/gallery/${type}/folders/${id}`, {
        method: 'DELETE',
    }).then(res => res.json());
}

export async function fetchModelMedia(modelType: MediaModelType, id: number): Promise<ModelMediaByCollection> {
    return await apiFetch(`/${modelType}/${id}/media`, {}).then(res => res.json());
}

export async function uploadModelMedia(modelType: MediaModelType, id: number, formData: FormData): Promise<MediaItem[]> {
    return await apiFetch(`/${modelType}/${id}/media`, {
        method: 'POST',
        body: formData,
    }).then(res => res.json());
}

export async function deleteModelMedia(modelType: MediaModelType, id: number, mediaId: MediaItem['id']): Promise<{ id: MediaItem['id'] }> {
    return await apiFetch(`/${modelType}/${id}/media/${mediaId}`, {
        method: 'DELETE',
    }).then(res => res.json());
}

export async function attachModelMedia(modelType: MediaModelType, id: number, collection: string, mediaId: MediaItem['id'], channelId: number): Promise<MediaItem> {
    return await apiFetch(`/${modelType}/${id}/media/attach`, {
        method: 'POST',
        body: JSON.stringify({ collection, media_id: mediaId, channel_id: channelId }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

export async function reorderModelMedia(modelType: MediaModelType, id: number, collection: string, ids: number[]): Promise<{ ids: number[] }> {
    return await apiFetch(`/${modelType}/${id}/media/reorder`, {
        method: 'POST',
        body: JSON.stringify({ collection, ids }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
}

// Which collections are offered for this model TYPE, per channel - grouped
// by channel_id. Configured centrally on MediaCollection's own edit page
// ("Przypisania" tab, App\Traits\HasMediaCollectionAssignments), not per
// model instance - there is deliberately no attach/detach-per-instance
// action anymore.
export async function fetchMediaCollectionAssignments(modelType: MediaModelType): Promise<MediaCollectionAssignmentsByChannel> {
    return await apiFetch(`/${modelType}/media-collection-assignments`, {}).then(res => res.json());
}
