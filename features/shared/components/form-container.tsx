import { useTranslations } from "next-intl";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Field } from "./ui/field";
import { Button } from "./ui/button";

interface ContainerProps<TFormValues extends FieldValues> {
    children: React.ReactNode;
    onSubmit?: (data: TFormValues) => void;
    form?: UseFormReturn<TFormValues>;
}

const FormContainer = <TFormValues extends FieldValues>({ children, onSubmit, form }: ContainerProps<TFormValues>) => {
    const tShared = useTranslations('Shared');

    return !onSubmit
        ? (<div>{children}</div>)
        : (
            <form onSubmit={form?.handleSubmit(onSubmit)}>
                {children}

                <Field orientation="horizontal" className="flex justify-end">
                    <Button type="submit">
                        {tShared('actions.save')}
                    </Button>
                </Field>
            </form>
        )
}

export default FormContainer