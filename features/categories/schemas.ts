import { routing } from "@/lib/i18n/routing"
import * as z from "zod"

const localesValidation = () => {
    return z.object((Object.fromEntries(routing.locales.map(locale => [locale, z.string().optional()]))))
}

export const categorySchema = z.object({
    parent_id: z.number().nullable(),
    name: localesValidation(),
    description: localesValidation().nullable(),
    short_description: localesValidation().nullable(),
    attributes: z.array(z.object({
        data: z.string().optional(),
        attribute_id: z.string().optional(),
    })).optional(),
})