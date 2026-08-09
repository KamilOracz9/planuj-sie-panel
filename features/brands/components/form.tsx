"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { brandSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/features/shared/components/form-container";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import TranslatedField from "@/features/shared/components/translated-field";
import { ModelAttributes } from "@/features/attributes";
import { useBrand } from "../context";
import { EntityMediaManager } from "@/features/media";
import { ChannelVisibilityField } from "@/features/channels";

interface FormProps {
    onSubmit?: (data: z.infer<typeof brandSchema>) => void;
    errors?: Record<string, string> | null;
}

type BrandFormValues = z.infer<typeof brandSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tBrands = useTranslations('Brands');
    const { normalizedActiveHash } = useTabs();

    const { brand, defaultNameValues, defaultAttributes, defaultChannels } = useBrand();

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: defaultNameValues,
            attributes: defaultAttributes,
            channels: defaultChannels,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.attributes'), tShared('tabs.channels'), tShared('tabs.media')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) })}>
                    <TranslatedField onSubmit={!!onSubmit} errors={errors} form={form} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.attributes'), tabs) })}>
                    <div className="space-y-4">
                        <ModelAttributes
                            form={form}
                            label={tBrands('fields.attribute_id')}
                            onSubmit={onSubmit}
                            errors={errors}
                        />
                    </div>
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.channels'), tabs) })}>
                    <ChannelVisibilityField form={form} onSubmit={onSubmit} errors={errors} />
                </div>

                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.media'), tabs) })}>
                    <EntityMediaManager modelType="brands" id={brand.id} disabled={!onSubmit} />
                </div>
            </>
        </FormContainer>

    )
}

export default Form