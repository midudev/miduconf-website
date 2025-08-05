import { useEffect, useState } from 'react'

interface Props {
  username: string
}

export const useLoadSavedDesign = ({ username }: Props) => {
  const [savedDesign, setSavedDesign] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ticket_design_${username}`)
      setSavedDesign(saved)
    } catch (error) {
      console.error('Error loading saved design:', error)
      setSavedDesign(null)
    } finally {
      setIsLoading(false)
    }
  }, [username])

  return {
    savedDesign,
    isLoading
  }
}