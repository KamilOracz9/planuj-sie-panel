import { ModelWithTranslations, Translation, Model, SelectItem } from "../shared/types";

export type Collection = {} & Model;

export type CollectionSelectItem = {} & SelectItem;

export type CollectionAttributeValue = {
    id: number;
    attribute_id: number;
    data: string;
};

export type CollectionWithTranslations = {
    attribute_values?: CollectionAttributeValue[];
} & ModelWithTranslations<CollectionTranslation>;

export type CollectionTranslation = {
    collection_id: number;
} & Translation
