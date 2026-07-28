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

interface FormProps {
    onSubmit?: (data: z.infer<typeof brandSchema>) => void;
    errors?: Record<string, string> | null;
}

type BrandFormValues = z.infer<typeof brandSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tBrands = useTranslations('Brands');
    const { normalizedActiveHash } = useTabs();

    const { defaultNameValues, defaultAttributes } = useBrand();

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: defaultNameValues,
            attributes: defaultAttributes,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic'), tShared('tabs.attributes')]
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
            </>
        </FormContainer>

    )
}

export default Form