export type ExistingPrice = {
    channel_id: number;
    currency_id: number;
    amount: number;
};

export type PriceBreakdownAttributeChoice = {
    attribute_name: string | null;
    option_id: number;
    option_name: string | null;
};

export type PriceBreakdownRow = {
    variant_id: number;
    variant_name: string;
    variant_price: number;
    attribute_options: PriceBreakdownAttributeChoice[];
    attributes_price: number;
    final_price: number;
};

export type PriceBreakdownCurrency = {
    currency_id: number;
    code: string;
    symbol: string;
    product_price: number;
    rows: PriceBreakdownRow[];
};

export type PriceBreakdown = {
    channel_id: number | null;
    currencies: PriceBreakdownCurrency[];
};
