"use client";

import Select from "@/features/shared/components/select";
import FormField from "@/features/shared/components/form-field";
import { useFieldArray, UseFormReturn, FieldValues, ArrayPath, Path } from "react-hook-form";
import { Button } from "@/features/shared/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { useTranslations } from "next-intl";

interface PriceEditorProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
}

interface PriceRowProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    index: number;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
    onRemove: () => void;
}

// When the panel's global channel switcher (see features/channels/components/channel-switcher.tsx)
// has an active channel, rows for other channels are hidden (not removed
// from form state - remove() is the only thing that deletes a row) and the
// channel picker itself is hidden since it's implied - "wszystkie akcje maja
// sie wykonywac tylko dla tego kanalu".
const PriceRow = <T extends FieldValues>({ form, index, onSubmit, errors, onRemove }: PriceRowProps<T>) => {
    const tShared = useTranslations("Shared");
    const { channelsSelect, activeChannelId } = useAppSelector(state => state.channel);
    const { currenciesSelect } = useAppSelector(state => state.currency);

    const channelIdField = `prices.${index}.channel_id` as Path<T>;
    const currencyIdField = `prices.${index}.currency_id` as Path<T>;
    const amountField = `prices.${index}.amount` as Path<T>;

    const currentChannelId = form.watch(channelIdField) as unknown as number | null;
    const currentCurrencyId = form.watch(currencyIdField) as unknown as number | null;
    const selectedChannel = channelsSelect.find(c => c.id === currentChannelId);
    const selectedCurrency = currenciesSelect.find(c => c.id === currentCurrencyId);

    if (activeChannelId && currentChannelId !== activeChannelId) {
        return null;
    }

    return (
        <div className="flex items-end gap-2">
            {!activeChannelId && (
                <div className="flex-1">
                    <Select
                        label={tShared('fields.channel')}
                        name={channelIdField}
                        items={channelsSelect}
                        formControl={form.control}
                        disabled={!onSubmit}
                        errors={errors}
                        defaultValue={selectedChannel?.name}
                        emptyMessage={tShared('messages.no-items-found')}
                    />
                </div>
            )}
            <div className="flex-1">
                <Select
                    label={tShared('fields.currency')}
                    name={currencyIdField}
                    items={currenciesSelect}
                    formControl={form.control}
                    disabled={!onSubmit}
                    errors={errors}
                    defaultValue={selectedCurrency?.name}
                    emptyMessage={tShared('messages.no-items-found')}
                />
            </div>
            <div className="flex-1">
                <FormField
                    label={tShared('fields.amount')}
                    name={amountField}
                    errors={errors}
                    control={form.control}
                    type="number"
                    step="0.01"
                    readonly={!onSubmit}
                />
            </div>
            {onSubmit && (
                <Button type="button" variant="destructive" onClick={onRemove}>
                    {tShared('actions.remove')}
                </Button>
            )}
        </div>
    );
};

const PriceEditor = <T extends FieldValues>({ form, onSubmit, errors }: PriceEditorProps<T>) => {
    const tShared = useTranslations("Shared");
    const { activeChannelId } = useAppSelector(state => state.channel);
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "prices" as ArrayPath<T>,
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <PriceRow
                    key={field.id}
                    form={form}
                    index={index}
                    onSubmit={onSubmit}
                    errors={errors}
                    onRemove={() => remove(index)}
                />
            ))}

            {onSubmit && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ channel_id: activeChannelId ?? null, currency_id: null, amount: '' } as any)}
                >
                    {tShared("actions.add")}
                </Button>
            )}
        </div>
    );
};

export default PriceEditor;
