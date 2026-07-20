import { Model, ModelWithTranslations, Translation } from "../shared/types";

export type Attribute = {} & Model;

export type AttributeWithTranslations = {
    attribute_type_id: number;
} & ModelWithTranslations<AttributeTranslation>;

export type AttributeTranslation = {
    attribute_id: number;
} & Translation;

export type AttributeType = {} & Model;

export type ExistingAttributeValue = {
    id: number;
    data: string;
    attribute_type_code: string;
    attribute_id: number;
}
