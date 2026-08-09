import * as z from "zod"

// z.union([z.string(), z.number()]) rather than z.coerce.number(): native
// number inputs report a string via RHF's Controller, and z.coerce.number()
// would give zod a different input/output type, breaking zodResolver's
// generic inference - same trick already used in prices/schemas.ts.
export const conversionsFieldSchema = z.array(z.object({
    channel_id: z.union([z.string(), z.number()]).nullable(),
    name: z.string().min(1),
    width: z.union([z.string(), z.number()]),
    height: z.union([z.string(), z.number()]),
    fit: z.enum(["crop", "contain"]),
})).optional()

export const assignmentsFieldSchema = z.array(z.object({
    channel_id: z.union([z.string(), z.number()]).nullable(),
    model_type: z.string().min(1),
})).optional()

export const mediaCollectionSchema = z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    kind: z.enum(["image", "document"]),
    type: z.enum(["single", "multiple"]),
    conversions: conversionsFieldSchema,
    assignments: assignmentsFieldSchema,
})
