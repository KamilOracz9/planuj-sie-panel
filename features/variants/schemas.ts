import { routing } from "@/lib/i18n/routing"
import { pricesFieldSchema } from "@/features/prices"
import * as z from "zod"

const localesValidation = () => {
    return z.object((Object.fromEntries(routing.locales.map(locale => [locale, z.string().optional()]))))
}

export const variantSchema = z.object({
    name: localesValidation(),
    product_id: z.number().nullable(),
    attributes: z.array(z.object({
        id: z.number().optional(),
        data: z.any().optional(),
        attribute_id: z.string().optional(),
    })).optional(),
    channels: z.array(z.object({
        channel_id: z.number(),
        is_enabled: z.boolean(),
    })).optional(),
    prices: pricesFieldSchema,
})