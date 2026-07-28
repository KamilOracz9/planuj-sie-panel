import { Model, ModelWithTranslations, Translation } from "../shared/types";

export type Attribute = {
    attribute_type_id?: number;
    attribute_type_code?: string;
} & Model;

export type AttributeWithTranslations = {
    attribute_type_id: number;
} & ModelWithTranslations<AttributeTranslation>;

export type AttributeTranslation = {
    attribute_id: number;
} & Translation;

export type AttributeType = {
    code?: string;
} & Model;

export type ExistingAttributeValue = {
    id: number;
    data: string | string[] | boolean | null;
    attribute_type_code: string;
    attribute_id: number;
}

export type AttributeOption = {} & Model;

export type AttributeOptionWithTranslations = { attribute_id: number } & ModelWithTranslations<AttributeOptionTranslation>;

export type AttributeOptionTranslation = {
    attribute_option_id: number;
} & Translation;

export type AttributeOptionSelectItem = {
    id: number;
    name: string;
}
