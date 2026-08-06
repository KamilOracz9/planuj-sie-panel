import { ModelWithTranslations, Translation, Model, SelectItem } from "../shared/types";

export type Brand = {} & Model;

export type BrandSelectItem = {} & SelectItem;

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
