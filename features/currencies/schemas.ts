import * as z from "zod"

export const currencySchema = z.object({
    code: z.string().length(3),
    name: z.string().min(1),
    symbol: z.string().min(1),
    // Native <input type="number"> reports a string via RHF's Controller.
    // z.coerce.number() would give zod a different input/output type, which
    // breaks zodResolver's generic inference - a plain union keeps a single
    // type instead, matching how other native-number-input fields in this
    // repo are typed (see attributes.*.data: z.any()).
    decimal_places: z.union([z.string(), z.number()]),
})
