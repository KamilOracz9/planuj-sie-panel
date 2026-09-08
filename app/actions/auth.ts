"use server"

import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import { ACCESS_TOKEN_COOKIE } from "@/features/auth/constants";
import { loginSchema } from "@/features/auth/schemas";
import { apiFetch } from "@/lib/api-client";

export type LoginState = { error: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const parsed = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return { error: "Podaj prawidłowy adres e-mail i hasło." };
    }

    // AuthController::login() reads credentials from the query string, not
    // a JSON body.
    const params = new URLSearchParams(parsed.data);

    const res = await fetch(`${process.env.API_URL}/login?${params}`, {
        method: "POST",
        headers: {
            "X-API-KEY": process.env.API_KEY || "",
        },
    });

    if (!res.ok) {
        return { error: "Nieprawidłowy e-mail lub hasło." };
    }

    const data: { access_token: string; expires_in: number } = await res.json();

    (await cookies()).set(ACCESS_TOKEN_COOKIE, data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.expires_in,
        path: "/",
    });

    redirect({ href: "/", locale: await getLocale() });
}

export async function logout() {
    await apiFetch("/logout", { method: "POST" }).catch(() => undefined);

    (await cookies()).delete(ACCESS_TOKEN_COOKIE);

    redirect({ href: Route.PUBLIC.SIGN_IN.PATHNAME, locale: await getLocale() });
}
