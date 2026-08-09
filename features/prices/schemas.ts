import * as z from "zod"

export const pricesFieldSchema = z.array(z.object({
    channel_id: z.number().nullable(),
    currency_id: z.number().nullable(),
    // z.coerce.number() gives zod a different input/output type, which
    // breaks zodResolver's generic inference once this is composed into
    // productSchema/variantSchema/attributeOptionSchema - a plain union
    // keeps a single type (native number inputs report a string via RHF's
    // Controller) without that split, consistent with how this repo already
    // handles other native-number-input fields (see attributes.*.data: z.any()).
    amount: z.union([z.string(), z.number()]).refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(String(value)),
        { message: "Amount must have at most 2 decimal places" }
    ),
})).optional()
