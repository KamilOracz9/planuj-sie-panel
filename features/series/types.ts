import { ModelWithTranslations, Translation, Model, SelectItem } from "../shared/types";

export type Series = {} & Model;

export type SeriesSelectItem = {} & SelectItem;

export type SeriesAttributeValue = {
    id: number;
    attribute_id: number;
    data: string;
};

export type SeriesWithTranslations = {
    attribute_values?: SeriesAttributeValue[];
} & ModelWithTranslations<SeriesTranslation>;

export type SeriesTranslation = {
    series_id: number;
} & Translation
