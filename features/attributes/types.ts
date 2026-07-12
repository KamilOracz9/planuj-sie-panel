import { Model, ModelWithTranslations, Translation } from "../shared/types";

export type Attribute = {} & Model;

export type AttributeWithTranslations = {} & ModelWithTranslations<AttributeTranslation>;

export type AttributeTranslation = {
    attribute_id: number;
} & Translation;
