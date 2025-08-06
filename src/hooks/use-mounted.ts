import { useLayoutEffect, useState } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}
