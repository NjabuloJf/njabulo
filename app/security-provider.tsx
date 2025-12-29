"use client"

import type React from "react"
import { createContext, useContext } from "react"

const SecurityContext = createContext({})

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  return <SecurityContext.Provider value={{}}>{children}</SecurityContext.Provider>
}

export function useSecurity() {
  const context = useContext(SecurityContext)
  if (!context) {
    throw new Error("useSecurity must be used within SecurityProvider")
  }
  return context
}
