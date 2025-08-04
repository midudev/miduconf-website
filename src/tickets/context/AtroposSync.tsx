'use client'

import { createContext, useContext, useRef, useCallback } from 'react'

interface AtroposSyncContextType {
  setTiltHandler: (handler: (x: number, y: number) => void) => void
  onTilt: (x: number, y: number) => void
}

const AtroposSyncContext = createContext<AtroposSyncContextType | null>(null)

export const AtroposSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const tiltHandlerRef = useRef<((x: number, y: number) => void) | null>(null)

  const setTiltHandler = useCallback((handler: (x: number, y: number) => void) => {
    tiltHandlerRef.current = handler
  }, [])

  const onTilt = useCallback((x: number, y: number) => {
    if (tiltHandlerRef.current) {
      tiltHandlerRef.current(x, y)
    }
  }, [])

  return (
    <AtroposSyncContext.Provider value={{ setTiltHandler, onTilt }}>
      {children}
    </AtroposSyncContext.Provider>
  )
}

export const useAtroposSync = () => {
  const context = useContext(AtroposSyncContext)
  if (!context) {
    throw new Error('useAtroposSync must be used within AtroposSyncProvider')
  }
  return context
}