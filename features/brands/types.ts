import { ModelWithTranslations, Translation, Model } from "../shared/types";

export type Brand = {} & Model;

export type BrandAttributeValue = {
    id: number;
    attribute_id: number;
    data: string;
};

export type BrandWithTranslations = {
    attribute_values?: BrandAttributeValue[];
} & ModelWithTranslations<BrandTranslation>;

export type BrandTranslation = {
    brand_id: number;
} & Translation
