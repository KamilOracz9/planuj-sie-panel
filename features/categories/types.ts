import { Model, ModelWithTranslations, SelectItem, Translation } from "../shared/types";

export type CategorySelectItem = {} & SelectItem;

export type Category = {
    parent_name: string;
} & Model;

export type CategoryWithTranslations = {
    parent_id: number | null;
} & ModelWithTranslations<CategoryTranslation>;

export type CategoryTranslation = {
    category_id: number;
    description: string | null;
    short_description: string | null;
} & Translation;
