import { routing } from "@/lib/i18n/routing"
import * as z from "zod"

const localesValidation = () => {
    return z.object((Object.fromEntries(routing.locales.map(locale => [locale, z.string().optional()]))))
}

export const variantSchema = z.object({
    name: localesValidation(),
    product_id: z.number().nullable(),
})