import { Field, FieldError, FieldLabel } from './ui/field'
import { Controller } from 'react-hook-form'
import { Input } from './ui/input'

interface FormFieldProps {
  label?: string;
  name: string;
  errors?: Record<string, string> | null;
  control: any;
}

const FormField = ({ label, name, errors, control }: FormFieldProps) => {
  return (
    <Field>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input id={name} {...field} />
        )}
      />
      {errors && errors[name] && (
        <FieldError>{errors[name]}</FieldError>
      )}
    </Field>
  )
}

export default FormField