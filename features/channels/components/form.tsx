"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { channelSchema } from "../schemas";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/features/shared/components/form-container";
import Tabs, { isTabActive, useTabs } from "@/features/shared/components/tabs";
import { cn } from "@/lib/utils";
import TranslatedField from "@/features/shared/components/translated-field";
import { useChannel } from "../context";

interface FormProps {
    onSubmit?: (data: z.infer<typeof channelSchema>) => void;
    errors?: Record<string, string> | null;
}

type ChannelFormValues = z.infer<typeof channelSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const { normalizedActiveHash } = useTabs();

    const { defaultNameValues } = useChannel();

    const form = useForm<ChannelFormValues>({
        resolver: zodResolver(channelSchema),
        defaultValues: {
            name: defaultNameValues,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) })}>
                    <TranslatedField onSubmit={!!onSubmit} errors={errors} form={form} />
                </div>
            </>
        </FormContainer>

    )
}

export default Form
