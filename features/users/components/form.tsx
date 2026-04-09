import { Button } from "@/features/shared/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/features/shared/components/ui/field"
import { Input } from "@/features/shared/components/ui/input"
import { useTranslations } from "next-intl";
import { use } from "react";
import { User } from "../types";

interface FormProps {
    handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    userPromise?: Promise<User>;
    errors?: Record<string, string> | null;
}

interface FieldsProps {
    readonly?: boolean;
    userPromise?: Promise<User>;
    errors?: Record<string, string> | null;
}

const Form = ({ handleSubmit, userPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');

    const isReadonly = !handleSubmit;

    if (isReadonly) {
        return (
            <div>
                <Fields readonly={true} userPromise={userPromise} errors={errors} />
            </div>
        )
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <Fields userPromise={userPromise} errors={errors} />

            <div className="w-full text-right">
                <Button type="submit" className="mt-6 ml-auto cursor-pointer">{tShared('actions.save')}</Button>
            </div>
        </form>
    )
}

const Fields = ({ readonly, userPromise, errors }: FieldsProps) => {
    const tUsers = useTranslations('Users');
    const tShared = useTranslations('Shared');

    const user = userPromise ? use(userPromise) : {} as User;

    return (
        <FieldSet>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">{tShared('fields.name')}</FieldLabel>
                    <Input id="name" defaultValue={user.name} name="name" autoComplete="off" placeholder={tShared('fields.name')} disabled={readonly} />
                    <FieldError>{errors?.name}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">{tShared('fields.email')}</FieldLabel>
                    <Input id="email" defaultValue={user.email} name="email" type="email" autoComplete="off" placeholder={tShared('fields.email')} disabled={readonly} />
                    <FieldError>{errors?.email}</FieldError>
                </Field>
                {!readonly && !user.id ? (
                    <>
                        <Field>
                            <FieldLabel htmlFor="password">{tUsers('fields.password')}</FieldLabel>
                            <Input id="password" name="password" type="password" autoComplete="off" placeholder={tUsers('fields.password')} disabled={readonly} />
                            <FieldError>{errors?.password}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm_password">{tUsers('fields.confirm_password')}</FieldLabel>
                            <Input id="confirm_password" name="confirm_password" type="password" autoComplete="off" placeholder={tUsers('fields.confirm_password')} disabled={readonly} />
                            <FieldError>{errors?.confirm_password}</FieldError>
                        </Field>
                    </>
                ) : <></>}
            </FieldGroup>
        </FieldSet>
    )
}

export default Form