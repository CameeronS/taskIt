import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof userSchema>

export const updateDocumentSchema = z.object({
  id: z.number(),
  title: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
})

export const documentSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  icon: z.string().optional().nullable(),
  parentId: z.number().optional().nullable(),
})

export const documentListSchema = z.array(documentSchema)

export type Document = z.infer<typeof documentSchema> & {
  children: Document[]
}

export const recursiveDocumentSchema: z.ZodType<Document> =
  documentSchema.extend({
    children: z.lazy(() => z.array(recursiveDocumentSchema)),
  })

export const createDocumentSchema = z.object({
  title: z.string(),
  content: z.string(),
  icon: z.string().optional().nullable(),
  parentId: z.number().optional().nullable(),
})
