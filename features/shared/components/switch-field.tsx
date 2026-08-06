import { Field, FieldError, FieldLabel } from './ui/field'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Switch } from './ui/switch'

interface SwitchFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  errors?: Record<string, string> | null;
  control: Control<T>;
  disabled?: boolean;
}

const SwitchField = <T extends FieldValues>({ label, name, errors, control, disabled = false }: SwitchFieldProps<T>) => {
  return (
    <Field orientation="horizontal">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch
            id={name}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        )}
      />
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      {errors && errors[name] && (
        <FieldError>{errors[name]}</FieldError>
      )}
    </Field>
  )
}

export default SwitchField
