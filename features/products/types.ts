import { Model, ModelWithTranslations, SelectItem, Translation } from "../shared/types";

export type ProductSelectItem = {} & SelectItem;

export type Product = {} & Model;

export type ProductWithTranslations = {} & ModelWithTranslations<ProductTranslation>;

export type ProductTranslation = {
    product_id: number;
} & Translation;
