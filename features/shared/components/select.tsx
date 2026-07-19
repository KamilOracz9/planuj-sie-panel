import { Field, FieldError, FieldLabel } from './ui/field';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from './ui/combobox';
import { Model } from '../types';

interface SelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    items: { id: Model['id'] | null; name: Model['name'] }[];
    defaultValue?: string;
    disabled?: boolean;
    errors?: Record<string, string> | null;
    emptyMessage?: string;
    formControl: Control<T>;
}

const Select = <T extends FieldValues>({ label, name, items, formControl, defaultValue, disabled, errors, emptyMessage = 'No items found' }: SelectProps<T>) => {
    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Controller
                control={formControl}
                name={name}
                render={({ field }) => (
                    <Combobox disabled={disabled} items={items} autoHighlight multiple={false} defaultValue={defaultValue} onValueChange={(value) => {
                        const selectedItem = items.find(c => c.name === value);
                        field.onChange(selectedItem ? selectedItem.id : null);
                    }}>
                        <ComboboxInput disabled={disabled} readOnly={disabled} placeholder={label} className="focus-visible:ring-0" />
                        <ComboboxContent>
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
                )}
            />
            {errors && errors[name] && (
                <FieldError>{errors[name]}</FieldError>
            )}
        </Field>
    )
}

export default Select