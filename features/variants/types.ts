import { Model, ModelWithTranslations, Translation } from "../shared/types";

export type Variant = {
    product_id: number;
} & Model;

export type VariantWithTranslations = {
    product_id: number;
} & ModelWithTranslations<VariantTranslation>;

export type VariantTranslation = {
    variant_id: number;
} & Translation;
