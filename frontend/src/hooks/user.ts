import {
  getUser,
  getUserArchivedDocuments,
  getUserDocuments,
} from "@/api-requests/user"
import { queryOptions } from "@tanstack/react-query"

export const userQueryOptions = queryOptions({
  queryKey: ["getUser"],
  queryFn: getUser,
  staleTime: Infinity,
  retry: 1,
})

export const useUserDocumentsOptions = queryOptions({
  queryKey: ["getUserDocuments"],
  queryFn: getUserDocuments,
  staleTime: Infinity,
})

export const useUserArchivedDocumentsOptions = queryOptions({
  queryKey: ["getUserArchivedDocuments"],
  queryFn: getUserArchivedDocuments,
  staleTime: Infinity,
})
