import { Field, FieldError, FieldLabel } from './ui/field';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    useComboboxAnchor,
} from './ui/combobox';
import { Model } from '../types';

interface MultiSelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    items: { id: Model['id']; name: Model['name'] }[];
    formControl: Control<T>;
    disabled?: boolean;
    errors?: Record<string, string> | null;
    emptyMessage?: string;
}

const MultiSelect = <T extends FieldValues>({ label, name, items, formControl, disabled, errors, emptyMessage = 'No items found' }: MultiSelectProps<T>) => {
    const anchor = useComboboxAnchor();

    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Controller
                control={formControl}
                name={name}
                render={({ field }) => {
                    const selectedIds: (string | number)[] = Array.isArray(field.value) ? field.value : [];
                    const selectedNames = selectedIds
                        .map((id) => items.find((item) => String(item.id) === String(id))?.name)
                        .filter((itemName): itemName is string => !!itemName);

                    return (
                        <Combobox
                            disabled={disabled}
                            items={items}
                            autoHighlight
                            multiple
                            value={selectedNames}
                            onValueChange={(values) => {
                                const ids = values
                                    .map((value) => items.find((item) => item.name === value)?.id)
                                    .filter((id): id is Model['id'] => id !== undefined);
                                field.onChange(ids);
                            }}
                        >
                            <ComboboxChips ref={anchor}>
                                {selectedNames.map((itemName) => (
                                    <ComboboxChip key={itemName}>{itemName}</ComboboxChip>
                                ))}
                                <ComboboxChipsInput disabled={disabled} placeholder={label} />
                            </ComboboxChips>
                            <ComboboxContent anchor={anchor}>
                                <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.id} value={item.name}>
                                            {item.name}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    );
                }}
            />
            {errors && errors[name] && (
                <FieldError>{errors[name]}</FieldError>
            )}
        </Field>
    )
}

export default MultiSelect
