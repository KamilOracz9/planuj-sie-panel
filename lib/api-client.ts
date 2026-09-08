import "server-only";

import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "@/features/auth/constants";

// Server-to-server only: the API's JWT lives in an httpOnly cookie readable
// only here, forwarded as a Bearer header to Laravel. Every app/actions/*.ts
// call should go through this instead of a bare fetch(), so the X-API-KEY
// and Authorization headers only need to be correct in one place.
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;

    const headers = new Headers(init.headers);
    headers.set("X-API-KEY", process.env.API_KEY || "");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${process.env.API_URL}${path}`, { ...init, headers });
}
