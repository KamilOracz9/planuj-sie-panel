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

interface FormProps {
    onSubmit?: (data: z.infer<typeof productSchema>) => void;
    errors?: Record<string, string> | null;
}

type ProductFormValues = z.infer<typeof productSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tProducts = useTranslations('Products');
    const { normalizedActiveHash } = useTabs();

    const { product, defaultNameValues, defaultAttributes } = useProduct();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: defaultNameValues,
            attributes: defaultAttributes,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.attributes'), tShared('tabs.media'), tShared('tabs.documents')]
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
                            label={tProducts('fields.attribute_id')}
                            onSubmit={onSubmit}
                            errors={errors}
                        />
                    </div>
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
