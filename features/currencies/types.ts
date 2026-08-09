import { SelectItem } from "../shared/types";

// No ModelWithTranslations/Model reuse here: Currency has no translations and
// no slug, unlike every other catalog entity (code/name/symbol are ISO
// reference data, not per-locale content) - see api/database/migrations
// .../create_currencies_table.php for the same rationale on the backend.
export type Currency = {
    id: number | string;
    code: string;
    name: string;
    symbol: string;
    decimal_places: number;
    created_at: string;
};

export type CurrencySelectItem = {
    code: string;
    symbol: string;
    decimal_places: number;
} & SelectItem;
