import { routing } from "@/lib/i18n/routing"
import * as z from "zod"

const localesValidation = () => {
    return z.object((Object.fromEntries(routing.locales.map(locale => [locale, z.string().optional()]))))
}

export const attributeSchema = z.object({
    name: localesValidation(),
    attribute_type_id: z.number().int().optional(),
})

export const attributeOptionSchema = z.object({
    name: localesValidation(),
})