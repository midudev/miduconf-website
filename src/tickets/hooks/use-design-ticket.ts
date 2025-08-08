import { useState, useEffect } from 'react'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { AnimationOption } from '../types/animation-option'
import { StructureOpcion } from '../types/structure-option'
import { ColorOption } from '../types/color-option'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { StickerOption } from '../types/sticker-option'
import { useUpdateTicketInDB } from './use-update-ticket-in-db'

interface Props {
  hologram: HologramOption
  savedDesign?: string | null // JSON string from database flavour field
  username?: string
}

export const useDesignTicket = ({ hologram, savedDesign, username }: Props) => {
  const { handleUpdateTicketDesign } = useUpdateTicketInDB()

  const [ticketDesign, setTicketDesign] = useState<TicketDesign>(() =>
    getInitialState({
      hologram,
      savedDesign,
      username
    })
  )

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Auto-save to localStorage on design changes
  useEffect(() => {
    if (!username) return

    const designData = JSON.stringify({
      hologram: ticketDesign.hologram,
      color: ticketDesign.color,
      structure: ticketDesign.structure,
      animation: ticketDesign.animation,
      sticker: ticketDesign.sticker,
      _metadata: { type: 'design_data', version: '1.0' }
    })

    try {
      localStorage.setItem(`ticket_design_${username}`, designData)

      // Compare with DB state to determine if there are unsaved changes
      const dbDesign = savedDesign || getDefaultDesignJson(hologram)
      setHasUnsavedChanges(designData !== dbDesign)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [ticketDesign, savedDesign, username, hologram])

  const handleChangeDesign = (options: Partial<TicketDesign>) => {
    setTicketDesign((lastDesign) => ({
      animation: options.animation ?? lastDesign.animation,
      color: options.color ?? lastDesign.color,
      structure: options.structure ?? lastDesign.structure,
      hologram: options.hologram ?? lastDesign.hologram,
      sticker: options.sticker ?? lastDesign.sticker
    }))
  }

  const handleChangeAnimation = (animation: AnimationOption) => {
    const persistAnimation = animation === ticketDesign.animation
    if (persistAnimation) return

    handleChangeDesign({
      animation
    })
  }

  const handleChangeStructure = (structure: StructureOpcion) => {
    const persistStructure = structure === ticketDesign.structure
    if (persistStructure) return

    handleChangeDesign({
      structure
    })
  }

  const handleChangeColor = (color: ColorOption) => {
    const persistColor = color === ticketDesign.color
    if (persistColor) return

    handleChangeDesign({
      color
    })
  }

  const handleChangeHologram = (hologram: HologramOption) => {
    const persistHologram = hologram === ticketDesign.hologram
    if (persistHologram) return

    handleChangeDesign({
      hologram
    })
  }

  const handleRemoveSticker = (sticker: StickerOption) => {
    const defaultStickers = ticketDesign.sticker ?? [null, null, null]
    const allStickers = Array.from({ length: 3 }, (_, i) => defaultStickers[i] ?? null)

    const isStickerExist = allStickers.includes(sticker)

    if (!isStickerExist) return

    const indexOfSticker = allStickers.findIndex((s) => s === sticker)
    allStickers.splice(indexOfSticker, 1, null)

    handleChangeDesign({
      sticker: [...allStickers]
    })
  }

  const handleAddSticker = (sticker: StickerOption) => {
    const defaultStickers = ticketDesign.sticker ?? [null, null, null]
    const allStickers = Array.from({ length: 3 }, (_, i) => defaultStickers[i] ?? null)

    // si agregamos un 4to sticker, remplazamos el 3ro
    const isStickersFilled = allStickers.every((s) => s != null)
    if (isStickersFilled) {
      allStickers.splice(allStickers.length - 1, 1, sticker)

      handleChangeDesign({
        sticker: [...allStickers]
      })

      return
    }

    // cambiamos el primer null por el sticker
    const firstNullIndex = allStickers.findIndex((s) => s === null)
    allStickers.splice(firstNullIndex, 1, sticker)

    handleChangeDesign({
      sticker: [...allStickers]
    })
  }

  const handleSaveDesign = async () => {
    if (!username) {
      console.error('No username provided for saving design')
      return { error: 'No username provided' }
    }

    setIsSaving(true)

    try {
      const result = await handleUpdateTicketDesign({
        ticketDesign,
        username
      })

      if (!result.error) {
        // Wait a bit for user to see success state
        await new Promise((resolve) => setTimeout(resolve, 500))
        setHasUnsavedChanges(false)
      }

      return result
    } finally {
      setIsSaving(false)
    }
  }

  return {
    ticketDesign,
    hasUnsavedChanges,
    isSaving,
    handleChangeAnimation,
    handleChangeStructure,
    handleChangeColor,
    handleChangeHologram,
    handleAddSticker,
    handleRemoveSticker,
    handleSaveDesign
  }
}

const getInitialState = ({
  hologram,
  savedDesign,
  username
}: {
  hologram: HologramOption
  savedDesign?: string | null
  username?: string
}) => {
  // Try to load from localStorage first, then from DB
  let parsedDesign: Partial<TicketDesign> = {}

  // 1. Try localStorage
  if (username && typeof window !== 'undefined') {
    try {
      const localData = localStorage.getItem(`ticket_design_${username}`)
      if (localData) {
        parsedDesign = JSON.parse(localData)
      }
    } catch (error) {
      console.error('Error parsing localStorage design:', error)
    }
  }

  // 2. Fallback to DB saved design if no localStorage
  if (Object.keys(parsedDesign).length === 0 && savedDesign) {
    try {
      parsedDesign = JSON.parse(savedDesign)
    } catch (error) {
      console.error('Error parsing saved design:', error)
    }
  }

  return {
    ...INITIAL_STATE,
    hologram, // Use the passed hologram as fallback/override
    ...parsedDesign // Apply saved design if available
  }
}

const getDefaultDesignJson = (hologram: HologramOption): string => {
  return JSON.stringify({
    ...INITIAL_STATE,
    hologram,
    _metadata: { type: 'design_data', version: '1.0' }
  })
}

const INITIAL_STATE = {
  animation: PERSONALIZE_TIKET_OPTIONS.ANIMATION.DEFAULT,
  structure: PERSONALIZE_TIKET_OPTIONS.STRUCTURE.CIRCLE,
  color: PERSONALIZE_TIKET_OPTIONS.COLOR.BLUE,
  hologram: PERSONALIZE_TIKET_OPTIONS.HOLOGRAM[1],
  sticker: null
} as TicketDesign
