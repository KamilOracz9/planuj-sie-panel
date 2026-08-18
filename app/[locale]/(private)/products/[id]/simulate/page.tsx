"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table";
import { Link } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import { formatDate, slugify } from "@/lib/utils";
import { useProductSimulation } from "@/features/products";
import { useAttribute } from "@/features/attributes";
import { fetchAttributeOptionsListForSelect } from "@/app/actions/attribute-option";
import { AttributeOptionSelectItem, ExistingAttributeValue } from "@/features/attributes/types";
import { EntityMediaManager } from "@/features/media";

const AttributeValueRow = ({ value }: { value: ExistingAttributeValue }) => {
    const locale = useLocale();
    const tShared = useTranslations("Shared");
    const { attributesSelect } = useAttribute();
    const attribute = attributesSelect.find(a => String(a.id) === String(value.attribute_id));
    const isChoiceType = value.attribute_type_code === 'select' || value.attribute_type_code === 'multiselect';
    const [options, setOptions] = useState<AttributeOptionSelectItem[]>([]);

    useEffect(() => {
        if (isChoiceType) {
            fetchAttributeOptionsListForSelect({ locale, attributeId: value.attribute_id }).then(setOptions);
        }
    }, [isChoiceType, value.attribute_id, locale]);

    const displayValue = () => {
        if (value.attribute_type_code === 'boolean') {
            return value.data ? tShared('values.yes') : tShared('values.no');
        }

        if (value.attribute_type_code === 'select') {
            return options.find(o => String(o.id) === String(value.data))?.name ?? tShared('values.null');
        }

        if (value.attribute_type_code === 'multiselect' && Array.isArray(value.data)) {
            const names = value.data
                .map(id => options.find(o => String(o.id) === String(id))?.name)
                .filter((name): name is string => !!name);

            return names.length ? names.join(', ') : tShared('values.null');
        }

        return value.data ? String(value.data) : tShared('values.null');
    };

    return (
        <div className="flex items-center justify-between border-b py-2 last:border-b-0">
            <span className="text-muted-foreground">{attribute?.name ?? value.attribute_id}</span>
            <span>{displayValue()}</span>
        </div>
    );
};

const Simulate = () => {
    const locale = useLocale();
    const tShared = useTranslations('Shared');
    const tProducts = useTranslations('Products');

    const {
        product,
        existingAttributes,
        collectionsSelect,
        selectedBrand,
        selectedSeries,
        variants,
        visibilityReport,
        priceBreakdown,
        activeChannelId,
    } = useProductSimulation();

    const translation = product.translations?.[locale];
    const selectedCollections = collectionsSelect.filter(c => product.collection_ids?.includes(c.id));

    return (
        <div className="flex-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.title')}</CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.basic')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{tShared('fields.name')}</span>
                        <span>{translation?.name}</span>
                    </div>
                    <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{tShared('fields.slug')}</span>
                        <span>{translation?.slug}</span>
                    </div>
                    {translation?.short_description && (
                        <div className="flex items-center justify-between border-b py-2">
                            <span className="text-muted-foreground">{tProducts('fields.short_description')}</span>
                            <span>{translation.short_description}</span>
                        </div>
                    )}
                    {translation?.description && (
                        <div className="flex items-center justify-between border-b py-2">
                            <span className="text-muted-foreground">{tProducts('fields.description')}</span>
                            <span>{translation.description}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between py-2">
                        <span className="text-muted-foreground">{tShared('fields.created_at')}</span>
                        <span>{product.created_at ? formatDate(product.created_at, locale) : ''}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.relations')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{tProducts('fields.brand_id')}</span>
                        {selectedBrand ? (
                            <Link className="underline" href={{ pathname: Route.PRIVATE.BRANDS.SHOW.PATHNAME, hash: slugify(tShared('tabs.basic')), params: { id: selectedBrand.id } }}>
                                {selectedBrand.name}
                            </Link>
                        ) : <span>{tShared('values.null')}</span>}
                    </div>
                    <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{tProducts('fields.series_id')}</span>
                        {selectedSeries ? (
                            <Link className="underline" href={{ pathname: Route.PRIVATE.SERIES.SHOW.PATHNAME, hash: slugify(tShared('tabs.basic')), params: { id: selectedSeries.id } }}>
                                {selectedSeries.name}
                            </Link>
                        ) : <span>{tShared('values.null')}</span>}
                    </div>
                    <div className="py-2">
                        <div className="text-muted-foreground pb-1">{tProducts('fields.collections')}</div>
                        {selectedCollections.length === 0 ? (
                            <span>{tShared('values.null')}</span>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {selectedCollections.map(collection => (
                                    <Link key={collection.id} className="underline" href={{ pathname: Route.PRIVATE.COLLECTIONS.SHOW.PATHNAME, hash: slugify(tShared('tabs.basic')), params: { id: collection.id } }}>
                                        {collection.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.variants')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {variants.length === 0 ? (
                        <span className="text-muted-foreground">{tShared('messages.no-items-found')}</span>
                    ) : (
                        <div className="space-y-1">
                            {variants.map(variant => (
                                <div key={variant.id} className="flex items-center justify-between border-b py-2 last:border-b-0">
                                    <Link className="underline" href={{ pathname: Route.PRIVATE.VARIANTS.SHOW.PATHNAME, hash: slugify(tShared('tabs.basic')), params: { id: variant.id } }}>
                                        {variant.name}
                                    </Link>
                                    <Link className="text-muted-foreground text-sm underline" href={{ pathname: Route.PRIVATE.VARIANTS.EDIT.PATHNAME, hash: slugify(tShared('tabs.basic')), params: { id: variant.id } }}>
                                        {tShared('actions.edit')}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.attributes')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {existingAttributes.length === 0 ? (
                        <span className="text-muted-foreground">{tShared('messages.no-items-found')}</span>
                    ) : (
                        existingAttributes.map(value => <AttributeValueRow key={value.id} value={value} />)
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.prices')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!activeChannelId ? (
                        <span className="text-muted-foreground">{tProducts('simulate.visibility.no_channel')}</span>
                    ) : !priceBreakdown || priceBreakdown.currencies.length === 0 ? (
                        <span className="text-muted-foreground">{tShared('messages.no-items-found')}</span>
                    ) : (
                        priceBreakdown.currencies.map(currency => (
                            <div key={currency.currency_id} className="space-y-2">
                                <div className="text-sm text-muted-foreground">
                                    {currency.code} &middot; {tProducts('simulate.prices.product_price')}: {currency.product_price} {currency.symbol}
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{tProducts('simulate.prices.variant_column')}</TableHead>
                                            <TableHead>{tProducts('simulate.prices.attribute_options_column')}</TableHead>
                                            <TableHead>{tProducts('simulate.prices.variant_price_column')}</TableHead>
                                            <TableHead>{tProducts('simulate.prices.attributes_price_column')}</TableHead>
                                            <TableHead>{tProducts('simulate.prices.final_price_column')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currency.rows.map((row, index) => (
                                            <TableRow key={`${row.variant_id}-${index}`}>
                                                <TableCell>{row.variant_name}</TableCell>
                                                <TableCell>
                                                    {row.attribute_options.length === 0
                                                        ? tShared('values.null')
                                                        : row.attribute_options.map(choice => `${choice.attribute_name}: ${choice.option_name}`).join(', ')}
                                                </TableCell>
                                                <TableCell>{row.variant_price} {currency.symbol}</TableCell>
                                                <TableCell>{row.attributes_price} {currency.symbol}</TableCell>
                                                <TableCell className="font-medium">{row.final_price} {currency.symbol}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.visibility')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {!activeChannelId ? (
                        <span className="text-muted-foreground">{tProducts('simulate.visibility.no_channel')}</span>
                    ) : !visibilityReport ? (
                        <span className="text-muted-foreground">{tShared('messages.no-items-found')}</span>
                    ) : visibilityReport.visible ? (
                        <span className="font-medium">{tProducts('simulate.visibility.visible')}</span>
                    ) : (
                        <div className="space-y-2">
                            <span className="font-medium text-destructive">{tProducts('simulate.visibility.hidden')}</span>
                            {!visibilityReport.own_enabled && (
                                <div className="text-sm text-muted-foreground">{tProducts('simulate.visibility.disabled_directly')}</div>
                            )}
                            {visibilityReport.blocking_groups.map((group, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                    {tProducts('simulate.visibility.blocked_by')}: {group.map(candidate => candidate.name ?? `${candidate.type} #${candidate.id}`).join(` ${tShared('values.or')} `)}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{tProducts('simulate.sections.media')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <EntityMediaManager modelType="products" id={product.id} disabled />
                </CardContent>
            </Card>
        </div>
    )
}

export default Simulate
