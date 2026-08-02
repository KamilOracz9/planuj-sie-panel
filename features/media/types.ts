export interface MediaItem {
    id: number;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    size: number;
    order_column: number | null;
    url: string;
    conversions: Record<string, string>;
    created_at: string;
}

export type MediaModelType =
    | 'attributes'
    | 'attribute-options'
    | 'attribute-values'
    | 'brands'
    | 'categories'
    | 'products'
    | 'variants';

export type IconModelMedia = { icon: MediaItem | null };
export type LogoModelMedia = { logo: MediaItem | null };
export type GalleryModelMedia = {
    gallery: MediaItem[];
    main_image: MediaItem | null;
    main_image_2: MediaItem | null;
};
export type DocumentsModelMedia = { documents: MediaItem[] };
