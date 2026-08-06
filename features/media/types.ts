export interface MediaItem {
    id: number;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    size: number;
    order_column: number | null;
    folder_id: number | null;
    url: string;
    conversions: Record<string, string>;
    created_at: string;
}

export type MediaFolderType = "images" | "documents";

export interface MediaFolder {
    id: number;
    name: string;
    parent_id: number | null;
}

/** Custom drag-and-drop payload types used to move folders and media between folders. */
export const DND_FOLDER_TYPE = "application/x-media-folder-id";
export const DND_MEDIA_TYPE = "application/x-media-item-id";

export type MediaModelType =
    | 'attributes'
    | 'attribute-options'
    | 'attribute-values'
    | 'brands'
    | 'categories'
    | 'products'
    | 'variants'
    | 'series'
    | 'collections';

export type IconModelMedia = { icon: MediaItem | null };
export type LogoModelMedia = { logo: MediaItem | null };
export type GalleryModelMedia = {
    gallery: MediaItem[];
    main_image: MediaItem | null;
    main_image_2: MediaItem | null;
};
export type DocumentsModelMedia = { documents: MediaItem[] };
