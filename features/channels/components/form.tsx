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
import SwitchField from "@/features/shared/components/switch-field";
import { useChannel } from "../context";

interface FormProps {
    onSubmit?: (data: z.infer<typeof channelSchema>) => void;
    errors?: Record<string, string> | null;
}

type ChannelFormValues = z.infer<typeof channelSchema>;

const Form = ({ onSubmit, errors }: FormProps) => {
    const tShared = useTranslations('Shared');
    const tChannels = useTranslations('Channels');
    const { normalizedActiveHash } = useTabs();

    const { channel, defaultNameValues } = useChannel();

    const form = useForm<ChannelFormValues>({
        resolver: zodResolver(channelSchema),
        defaultValues: {
            name: defaultNameValues,
            is_default: channel.is_default ?? false,
        },
    })

    const tabs = useMemo(() => {
        return [tShared('tabs.basic')]
    }, [])

    return (
        <FormContainer onSubmit={onSubmit} form={form} >
            <>
                <Tabs tabs={tabs} />
                <div className={cn({ 'hidden': !isTabActive(normalizedActiveHash, tShared('tabs.basic'), tabs) }, 'space-y-4')}>
                    <TranslatedField onSubmit={!!onSubmit} errors={errors} form={form} />
                    <SwitchField label={tChannels('fields.is_default')} name="is_default" control={form.control} disabled={!onSubmit} errors={errors} />
                </div>
            </>
        </FormContainer>

    )
}

export default Form
