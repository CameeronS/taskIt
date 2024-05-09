import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { RouterProvider, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
)