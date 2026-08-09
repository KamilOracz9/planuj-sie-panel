"use client";

import Select from "@/features/shared/components/select";
import FormField from "@/features/shared/components/form-field";
import { useFieldArray, UseFormReturn, FieldValues, ArrayPath, Path } from "react-hook-form";
import { Button } from "@/features/shared/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { useTranslations } from "next-intl";

const FIT_ITEMS = [
    { id: "crop", name: "crop" },
    { id: "contain", name: "contain" },
];

interface ConversionEditorProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
}

interface ConversionRowProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    index: number;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
    onRemove: () => void;
}

// Same useFieldArray row pattern as features/prices/components/price-editor.tsx
// (add/remove rows, per-row channel Select sourced from the preloaded Redux
// channelsSelect) - each row is one (channel, name) conversion definition.
const ConversionRow = <T extends FieldValues>({ form, index, onSubmit, errors, onRemove }: ConversionRowProps<T>) => {
    const tShared = useTranslations("Shared");
    const tMediaCollections = useTranslations("MediaCollections");
    const { channelsSelect } = useAppSelector(state => state.channel);

    const channelIdField = `conversions.${index}.channel_id` as Path<T>;
    const nameField = `conversions.${index}.name` as Path<T>;
    const widthField = `conversions.${index}.width` as Path<T>;
    const heightField = `conversions.${index}.height` as Path<T>;
    const fitField = `conversions.${index}.fit` as Path<T>;

    const currentChannelId = form.watch(channelIdField) as unknown as number | null;
    const currentFit = form.watch(fitField) as unknown as string | null;
    const selectedChannel = channelsSelect.find(c => c.id === currentChannelId);
    const selectedFit = FIT_ITEMS.find(f => f.id === currentFit);

    return (
        <div className="flex items-end gap-2">
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
            <div className="flex-1">
                <FormField
                    label={tMediaCollections('fields.conversion_name')}
                    name={nameField}
                    errors={errors}
                    control={form.control}
                    readonly={!onSubmit}
                />
            </div>
            <div className="flex-1">
                <FormField
                    label={tMediaCollections('fields.width')}
                    name={widthField}
                    errors={errors}
                    control={form.control}
                    type="number"
                    readonly={!onSubmit}
                />
            </div>
            <div className="flex-1">
                <FormField
                    label={tMediaCollections('fields.height')}
                    name={heightField}
                    errors={errors}
                    control={form.control}
                    type="number"
                    readonly={!onSubmit}
                />
            </div>
            <div className="flex-1">
                <Select
                    label={tMediaCollections('fields.fit')}
                    name={fitField}
                    items={FIT_ITEMS}
                    formControl={form.control}
                    disabled={!onSubmit}
                    errors={errors}
                    defaultValue={selectedFit?.name}
                    emptyMessage={tShared('messages.no-items-found')}
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

const ConversionEditor = <T extends FieldValues>({ form, onSubmit, errors }: ConversionEditorProps<T>) => {
    const tShared = useTranslations("Shared");
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "conversions" as ArrayPath<T>,
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <ConversionRow
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
                    onClick={() => append({ channel_id: null, name: '', width: '', height: '', fit: 'crop' } as any)}
                >
                    {tShared("actions.add")}
                </Button>
            )}
        </div>
    );
};

export default ConversionEditor;
