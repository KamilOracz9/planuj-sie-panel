"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useAppSelector } from "@/lib/redux/hooks";
import SwitchField from "@/features/shared/components/switch-field";

interface ChannelVisibilityFieldProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
}

const ChannelVisibilityField = <T extends FieldValues>({ form, onSubmit, errors }: ChannelVisibilityFieldProps<T>) => {
    const { channelsSelect } = useAppSelector(state => state.channel);

    return (
        <div className="space-y-4">
            {channelsSelect.map((channel, index) => (
                <SwitchField
                    key={channel.id}
                    label={channel.name}
                    name={`channels.${index}.is_enabled` as Path<T>}
                    control={form.control}
                    disabled={!onSubmit}
                    errors={errors}
                />
            ))}
        </div>
    )
}

export default ChannelVisibilityField
