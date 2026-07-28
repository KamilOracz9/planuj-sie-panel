import { routing } from "@/lib/i18n/routing"
import * as z from "zod"

const localesValidation = () => {
    return z.object((Object.fromEntries(routing.locales.map(locale => [locale, z.string().optional()]))))
}

export const productSchema = z.object({
    name: localesValidation(),
    attributes: z.array(z.object({
        data: z.any().optional(),
        attribute_id: z.string().optional(),
    })).optional(),
})