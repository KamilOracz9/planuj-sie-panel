import { Model, ModelWithTranslations, SelectItem, Translation } from "../shared/types";

export type ProductSelectItem = {} & SelectItem;

export type Product = {} & Model;

export type ProductWithTranslations = {
    brand_id: number | null;
    series_id: number | null;
    collection_ids: number[];
} & ModelWithTranslations<ProductTranslation>;

export type ProductTranslation = {
    product_id: number;
    description: string | null;
    short_description: string | null;
} & Translation;
