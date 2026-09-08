"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "../schemas";
import { login } from "@/app/actions/auth";
import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/features/shared/components/ui/field";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const t = useTranslations("Auth");
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = form.handleSubmit(async (values) => {
        setServerError(null);

        const formData = new FormData();
        formData.set("email", values.email);
        formData.set("password", values.password);

        const result = await login(undefined, formData);

        if (result?.error) {
            setServerError(result.error);
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">{t("fields.email")}</FieldLabel>
                    <Input id="email" type="email" autoComplete="username" {...form.register("email")} />
                    <FieldError errors={[form.formState.errors.email]} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">{t("fields.password")}</FieldLabel>
                    <Input id="password" type="password" autoComplete="current-password" {...form.register("password")} />
                    <FieldError errors={[form.formState.errors.password]} />
                </Field>
                {serverError && <FieldError>{serverError}</FieldError>}
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                    {t("submit")}
                </Button>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;
