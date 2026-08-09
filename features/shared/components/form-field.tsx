import { Field, FieldError, FieldLabel } from './ui/field'
import { Controller } from 'react-hook-form'
import { Input } from './ui/input'

interface FormFieldProps {
  label?: string;
  name: string;
  errors?: Record<string, string> | null;
  control: any;
  readonly?: boolean;
  type?: 'text' | 'number' | 'date';
  step?: string;
}

const FormField = ({ label, name, errors, control, readonly = false, type = 'text', step }: FormFieldProps) => {
  return (
    <Field>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input id={name} type={type} step={step} {...field} value={field.value ?? ''} className='focus-visible:ring-0' readOnly={readonly} disabled={readonly} />
        )}
      />
      {errors && errors[name] && (
        <FieldError>{errors[name]}</FieldError>
      )}
    </Field>
  )
}

export default FormField