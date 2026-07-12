import { ModelWithTranslations, Translation, Model } from "../shared/types";

export type Brand = {} & Model;

export type BrandWithTranslations = {} & ModelWithTranslations<BrandTranslation>;

export type BrandTranslation = {
    brand_id: number;
} & Translation
