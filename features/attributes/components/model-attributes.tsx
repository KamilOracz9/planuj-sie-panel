"use client";

import Select from "@/features/shared/components/select";
import { useFieldArray, UseFormReturn, FieldValues, ArrayPath, Path, Controller } from "react-hook-form";
import { useAttribute } from "../hooks";
import FormField from "@/features/shared/components/form-field";
import { Button } from "@/features/shared/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Attribute, AttributeOptionSelectItem } from "../types";
import { fetchAttributeOptionsListForSelect } from "@/app/actions/attribute-option";
import { FieldError } from "@/features/shared/components/ui/field";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    useComboboxAnchor,
} from "@/features/shared/components/ui/combobox";
import { MediaSheetButton } from "@/features/media";

interface ModelAttributesProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label: string;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
}

interface AttributeValueRowProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    index: number;
    label: string;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
    selectedAttribute?: Attribute;
    attributeSelectItems: { id: string; name: string }[];
    onRemove: () => void;
}

const AttributeValueRow = <T extends FieldValues>({
    form,
    index,
    label,
    onSubmit,
    errors,
    selectedAttribute,
    attributeSelectItems,
    onRemove,
}: AttributeValueRowProps<T>) => {
    const locale = useLocale();
    const tShared = useTranslations("Shared");
    const anchor = useComboboxAnchor();

    const attributeIdFieldName = `attributes.${index}.attribute_id` as Path<T>;
    const dataFieldName = `attributes.${index}.data` as Path<T>;

    const typeCode = selectedAttribute?.attribute_type_code;
    const isChoiceType = typeCode === 'select' || typeCode === 'multiselect';

    const existingId = form.watch(`attributes.${index}.id` as Path<T>) as unknown as number | undefined;

    const [options, setOptions] = useState<AttributeOptionSelectItem[]>([]);

    useEffect(() => {
        if (isChoiceType && selectedAttribute?.id) {
            fetchAttributeOptionsListForSelect({ locale, attributeId: Number(selectedAttribute.id) }).then(setOptions);
        } else {
            setOptions([]);
        }
    }, [isChoiceType, selectedAttribute?.id, locale]);

    return (
        <div className="flex items-end gap-2">
            <div className="flex-1">
                <Select
                    label={label}
                    name={attributeIdFieldName}
                    items={attributeSelectItems}
                    formControl={form.control}
                    disabled={!onSubmit}
                    errors={errors}
                    defaultValue={selectedAttribute?.name}
                />
            </div>
            <div className="flex-1">
                {typeCode === 'number' ? (
                    <FormField readonly={!onSubmit} name={dataFieldName} errors={errors} control={form.control} type="number" />
                ) : typeCode === 'date' ? (
                    <FormField readonly={!onSubmit} name={dataFieldName} errors={errors} control={form.control} type="date" />
                ) : typeCode === 'boolean' ? (
                    <Controller
                        control={form.control}
                        name={dataFieldName}
                        render={({ field }) => (
                            <div className="flex h-9 items-center">
                                <input
                                    type="checkbox"
                                    checked={!!field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    disabled={!onSubmit}
                                    className="h-4 w-4 rounded border-input"
                                />
                            </div>
                        )}
                    />
                ) : typeCode === 'select' ? (
                    <Controller
                        control={form.control}
                        name={dataFieldName}
                        render={({ field }) => {
                            const selectedOption = options.find((option) => String(option.id) === String(field.value));

                            return (
                                <>
                                    <Combobox
                                        disabled={!onSubmit}
                                        items={options}
                                        autoHighlight
                                        multiple={false}
                                        value={selectedOption?.name ?? null}
                                        onValueChange={(value) => {
                                            const selected = options.find((option) => option.name === value);
                                            field.onChange(selected ? selected.id : null);
                                        }}
                                    >
                                        <ComboboxInput disabled={!onSubmit} readOnly={!onSubmit} placeholder={label} className="focus-visible:ring-0" />
                                        <ComboboxContent>
                                            <ComboboxEmpty>{tShared('messages.no-items-found')}</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item.id} value={item.name}>
                                                        {item.name}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    {errors && errors[dataFieldName] && <FieldError>{errors[dataFieldName]}</FieldError>}
                                </>
                            );
                        }}
                    />
                ) : typeCode === 'multiselect' ? (
                    <Controller
                        control={form.control}
                        name={dataFieldName}
                        render={({ field }) => {
                            const selectedIds: (string | number)[] = Array.isArray(field.value) ? field.value : [];
                            const selectedNames = selectedIds
                                .map((id) => options.find((option) => String(option.id) === String(id))?.name)
                                .filter((name): name is string => !!name);

                            return (
                                <>
                                    <Combobox
                                        disabled={!onSubmit}
                                        items={options}
                                        autoHighlight
                                        multiple
                                        value={selectedNames}
                                        onValueChange={(values) => {
                                            const ids = values
                                                .map((value) => options.find((option) => option.name === value)?.id)
                                                .filter((id): id is number => id !== undefined);
                                            field.onChange(ids);
                                        }}
                                    >
                                        <ComboboxChips ref={anchor}>
                                            {selectedNames.map((name) => (
                                                <ComboboxChip key={name}>{name}</ComboboxChip>
                                            ))}
                                            <ComboboxChipsInput disabled={!onSubmit} placeholder={label} />
                                        </ComboboxChips>
                                        <ComboboxContent anchor={anchor}>
                                            <ComboboxEmpty>{tShared('messages.no-items-found')}</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item.id} value={item.name}>
                                                        {item.name}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    {errors && errors[dataFieldName] && <FieldError>{errors[dataFieldName]}</FieldError>}
                                </>
                            );
                        }}
                    />
                ) : (
                    <FormField readonly={!onSubmit} name={dataFieldName} errors={errors} control={form.control} />
                )}
            </div>
            {existingId && (
                <MediaSheetButton
                    modelType="attribute-values"
                    id={existingId}
                    title={selectedAttribute?.name ?? label}
                    disabled={!onSubmit}
                />
            )}
            {onSubmit && (
                <Button
                    type="button"
                    variant="destructive"
                    onClick={onRemove}
                >
                    {tShared("actions.remove")}
                </Button>
            )}
        </div>
    );
};

const ModelAttributes = <T extends FieldValues>({
    form,
    label,
    onSubmit,
    errors,
}: ModelAttributesProps<T>) => {
    const tShared = useTranslations("Shared");
    const { attributesSelect, attributeSelectItems } = useAttribute();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "attributes" as ArrayPath<T>,
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => {
                const currentAttributeId = form.watch(`attributes.${index}.attribute_id` as any);
                const selectedAttribute = attributesSelect?.find(
                    (a: Attribute) => String(a.id) === String(currentAttributeId)
                );

                return (
                    <AttributeValueRow
                        key={field.id}
                        form={form}
                        index={index}
                        label={label}
                        onSubmit={onSubmit}
                        errors={errors}
                        selectedAttribute={selectedAttribute}
                        attributeSelectItems={attributeSelectItems}
                        onRemove={() => remove(index)}
                    />
                );
            })}

            {onSubmit && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ attribute_id: "", data: "" } as any)}
                >
                    {tShared("actions.add")}
                </Button>
            )}
        </div>
    );
};

export default ModelAttributes;
