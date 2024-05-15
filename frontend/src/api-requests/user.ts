import api from "@/lib/api-interceptor"
import {
  Document,
  User,
  createDocumentSchema,
  documentListSchema,
} from "@/schemas/user"
import Cookies from "js-cookie"
import { z } from "zod"

export const getUser = async () => {
  if (!Cookies.get("auth_token")) return null
  const res = await api.get("/user/me")
  const data = res.data as User
  return data
}

export const getUserDocuments = async () => {
  if (!Cookies.get("auth_token")) return null
  const res = await api.get("/document/get")
  const data = res.data

  const validator = documentListSchema.safeParse(data)

  if (!validator.success) {
    console.error(validator.error.errors)
    return null
  }

  return data as Document[]
}

export const createDocument = async (
  values: z.infer<typeof createDocumentSchema>
) => {
  console.log(values)
  const validator = createDocumentSchema.safeParse(values)

  if (!validator.success) {
    console.error(validator.error.errors)
    throw new Error("Invalid document data")
  }

  await api.post("/document/create", values)

  return { success: true }
}

export const archiveDocument = async (id: number) => {
  const res = await api.put(`/document/archive/${id}`)
  if (res.status !== 200) {
    throw new Error("Failed to archive document")
  }
}

export const getUserArchivedDocuments = async () => {
  if (!Cookies.get("auth_token")) return null
  const res = await api.get("/document/get/archived")
  const data = res.data
  const validator = documentListSchema.safeParse(data)

  if (!validator.success) {
    console.error(validator.error.errors)
    return null
  }

  return data as Document[]
}

export const restoreDocument = async (id: number) => {
  const res = await api.put(`/document/restore/${id}`)
  if (res.status !== 200) {
    throw new Error("Failed to restore document")
  }
}

export const deleteDocument = async (id: number) => {
  const res = await api.delete(`/document/delete/${id}`)
  if (res.status !== 200) {
    throw new Error("Failed to delete document")
  }
}
