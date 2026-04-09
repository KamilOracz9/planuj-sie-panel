import { Button } from "@/features/shared/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/features/shared/components/ui/field"
import { Input } from "@/features/shared/components/ui/input"
import { useTranslations } from "next-intl";
import { use } from "react";
import { BrandWithTranslations } from "../types";

interface FormProps {
    handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    brandPromise?: Promise<BrandWithTranslations>;
    errors?: Record<string, string> | null;
}

interface FieldsProps {
    readonly?: boolean;
    brandPromise?: Promise<BrandWithTranslations>;
    errors?: Record<string, string> | null;
}

const Form = ({ handleSubmit, brandPromise, errors }: FormProps) => {
    const tShared = useTranslations('Shared');

    const isReadonly = !handleSubmit;

    if (isReadonly) {
        return (
            <div>
                <Fields readonly={true} brandPromise={brandPromise} errors={errors} />
            </div>
        )
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <Fields brandPromise={brandPromise} errors={errors} />

            <div className="w-full text-right">
                <Button type="submit" className="mt-6 ml-auto cursor-pointer">{tShared('actions.save')}</Button>
            </div>
        </form>
    )
}

const Fields = ({ readonly, brandPromise, errors }: FieldsProps) => {
    const tShared = useTranslations('Shared');

    const brand = brandPromise ? use(brandPromise) : {} as BrandWithTranslations;

    console.log(errors)

    return (
        <FieldSet>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name[pl-PL]">{tShared('fields.name')} PL</FieldLabel>
                    <Input id="name[pl-PL]" defaultValue={brand.translations ? brand.translations['pl-PL'].name : undefined} name="name[pl-PL]" autoComplete="off" placeholder={tShared('fields.name')} disabled={readonly} />
                    <FieldError>{errors ? errors['name.pl-PL'] : ''}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name[en-US]">{tShared('fields.name')} US</FieldLabel>
                    <Input id="name[en-US]" defaultValue={brand.translations ? brand.translations['en-US'].name : undefined} name="name[en-US]" autoComplete="off" placeholder={tShared('fields.name')} disabled={readonly} />
                    <FieldError>{errors ? errors['name.en-US'] : ''}</FieldError>
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default Form