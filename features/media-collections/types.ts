import { SelectItem } from "../shared/types";

// No ModelWithTranslations/Model reuse: code/name/kind/type are admin-facing
// config, not translatable catalog content - same rationale as Currency.
export type MediaCollectionKind = "image" | "document";
export type MediaCollectionType = "single" | "multiple";

export type MediaCollectionConversion = {
    channel_id: number | null;
    name: string;
    width: number | string;
    height: number | string;
    fit: "crop" | "contain";
};

// A model TYPE (e.g. "products", "attribute-options"), not a specific
// instance - matches api/config/media.php's model_types allow-list keys and
// panel/features/media/types.ts's MediaModelType.
export type MediaCollectionAssignment = {
    channel_id: number | null;
    model_type: string;
};

export type MediaCollection = {
    id: number | string;
    code: string;
    name: string;
    kind: MediaCollectionKind;
    type: MediaCollectionType;
    conversions?: MediaCollectionConversion[];
    assignments?: MediaCollectionAssignment[];
};

export type MediaCollectionSelectItem = {
    code: string;
    kind: MediaCollectionKind;
    type: MediaCollectionType;
} & SelectItem;
