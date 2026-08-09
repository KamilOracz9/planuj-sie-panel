export interface MediaItem {
    id: number;
    collection_name: string;
    channel_id: number | null;
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

// A media collection as offered for a model TYPE within one specific
// channel - not tied to a model instance. Which collections exist here is
// configured centrally on MediaCollection's own edit page ("Przypisania"
// tab), not per Product/Brand/etc row.
export type MediaCollectionForChannel = {
    id: number;
    code: string;
    name: string;
    kind: "image" | "document";
    type: "single" | "multiple";
};

// Keyed by channel_id (as a string, since it comes back through JSON).
export type MediaCollectionAssignmentsByChannel = Record<string, MediaCollectionForChannel[]>;

// Keyed by MediaCollection.code - dynamic (any collection the model
// instance actually has media in), unlike the old fixed
// {icon}/{logo}/{gallery,...}/{documents} shapes.
export type ModelMediaByCollection = Record<string, MediaItem[]>;
