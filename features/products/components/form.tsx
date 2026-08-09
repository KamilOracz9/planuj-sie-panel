"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { productSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/features/shared/components/form-container";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import TranslatedField from "@/features/shared/components/translated-field";
import { ModelAttributes } from "@/features/attributes";
import { useProduct } from "../context";
import { EntityMediaManager, DocumentsManager } from "@/features/media";
import { ChannelVisibilityField } from "@/features/channels";
import { PriceEditor } from "@/features/prices";
import Select from "@/features/shared/components/select";
import MultiSelect from "@/features/shared/components/multi-select";

interface FormProps {
    onSubmit?: (data: z.infer<typeof productSchema>) => void;
    errors?: Record<string, string> | null;
}

type ProductFormValues = z.infer<typeof productSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tProducts = useTranslations('Products');
    const { normalizedActiveHash } = useTabs();

    const {
        product,
        defaultNameValues,
        defaultAttributes,
        defaultChannels,
        defaultPrices,
        brandsSelect,
        seriesSelect,
        collectionsSelect,
        selectedBrand,
        selectedSeries,
    } = useProduct();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: defaultNameValues,
            brand_id: product.brand_id ?? null,
            series_id: product.series_id ?? null,
            collections: product.collection_ids ?? [],
            attributes: defaultAttributes,
            channels: defaultChannels,
            prices: defaultPrices,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.attributes'), tShared('tabs.channels'), tShared('tabs.prices'), tShared('tabs.media'), tShared('tabs.documents')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) }, 'space-y-4')}>
                    <TranslatedField onSubmit={!!onSubmit} errors={errors} form={form} />

                    <Select
                        label={tProducts('fields.brand_id')}
                        name={'brand_id'}
                        items={[{ id: null, name: tShared('values.null') }, ...brandsSelect]}
                        formControl={form.control}
                        defaultValue={selectedBrand?.name}
                        disabled={!onSubmit}
                        errors={errors}
                        emptyMessage={tShared('messages.no-items-found')}
                    />

                    <Select
                        label={tProducts('fields.series_id')}
                        name={'series_id'}
                        items={[{ id: null, name: tShared('values.null') }, ...seriesSelect]}
                        formControl={form.control}
                        defaultValue={selectedSeries?.name}
                        disabled={!onSubmit}
                        errors={errors}
                        emptyMessage={tShared('messages.no-items-found')}
                    />

                    <MultiSelect
                        label={tProducts('fields.collections')}
                        name={'collections'}
                        items={collectionsSelect}
                        formControl={form.control}
                        disabled={!onSubmit}
                        errors={errors}
                        emptyMessage={tShared('messages.no-items-found')}
                    />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.attributes'), tabs) })}>
                    <div className="space-y-4">
                        <ModelAttributes
                            form={form}
                            label={tProducts('fields.attribute_id')}
                            onSubmit={onSubmit}
                            errors={errors}
                        />
                    </div>
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.channels'), tabs) })}>
                    <ChannelVisibilityField form={form} onSubmit={onSubmit} errors={errors} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.prices'), tabs) })}>
                    <PriceEditor form={form} onSubmit={onSubmit} errors={errors} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.media'), tabs) })}>
                    <EntityMediaManager modelType="products" id={product.id} shape="gallery" disabled={!onSubmit} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.documents'), tabs) })}>
                    <DocumentsManager modelType="products" id={product.id} disabled={!onSubmit} />
                </div>
            </>
        </FormContainer>

    )
}

export default Form
