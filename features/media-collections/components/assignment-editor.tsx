"use client";

import Select from "@/features/shared/components/select";
import { useFieldArray, UseFormReturn, FieldValues, ArrayPath, Path } from "react-hook-form";
import { Button } from "@/features/shared/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { useTranslations } from "next-intl";

// Keep in sync with api/config/media.php's model_types allow-list keys.
const MODEL_TYPE_KEYS = [
    "products",
    "variants",
    "brands",
    "series",
    "collections",
    "categories",
    "attributes",
    "attribute-options",
    "attribute-values",
] as const;

interface AssignmentEditorProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
}

interface AssignmentRowProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    index: number;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
    onRemove: () => void;
}

// Same useFieldArray row pattern as price-editor.tsx/conversion-editor.tsx -
// each row is one (channel, model type) pair for which this collection is
// offered. Configured here, centrally, rather than per model instance.
const AssignmentRow = <T extends FieldValues>({ form, index, onSubmit, errors, onRemove }: AssignmentRowProps<T>) => {
    const tShared = useTranslations("Shared");
    const tMediaCollections = useTranslations("MediaCollections");
    const { channelsSelect } = useAppSelector(state => state.channel);

    const modelTypeItems = MODEL_TYPE_KEYS.map(key => ({ id: key, name: tMediaCollections(`model_types.${key}`) }));

    const channelIdField = `assignments.${index}.channel_id` as Path<T>;
    const modelTypeField = `assignments.${index}.model_type` as Path<T>;

    const currentChannelId = form.watch(channelIdField) as unknown as number | null;
    const currentModelType = form.watch(modelTypeField) as unknown as string | null;
    const selectedChannel = channelsSelect.find(c => c.id === currentChannelId);
    const selectedModelType = modelTypeItems.find(m => m.id === currentModelType);

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
                <Select
                    label={tMediaCollections('fields.model_type')}
                    name={modelTypeField}
                    items={modelTypeItems}
                    formControl={form.control}
                    disabled={!onSubmit}
                    errors={errors}
                    defaultValue={selectedModelType?.name}
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

const AssignmentEditor = <T extends FieldValues>({ form, onSubmit, errors }: AssignmentEditorProps<T>) => {
    const tShared = useTranslations("Shared");
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "assignments" as ArrayPath<T>,
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <AssignmentRow
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
                    onClick={() => append({ channel_id: null, model_type: '' } as any)}
                >
                    {tShared("actions.add")}
                </Button>
            )}
        </div>
    );
};

export default AssignmentEditor;
