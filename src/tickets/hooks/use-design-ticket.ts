import { useState } from 'react'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { AnimationOption } from '../types/animation-option'
import { StructureOpcion } from '../types/structure-option'
import { ColorOption } from '../types/color-option'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'

export const useDesignTicket = () => {
  const [ticketDesign, setTicketDesign] = useState<TicketDesign>(INITIAL_STATE)

  const handleChangeDesign = (options: Partial<TicketDesign>) => {
    setTicketDesign((lastDesign) => ({
      animation: options.animation ?? lastDesign.animation,
      color: options.color ?? lastDesign.color,
      structure: options.structure ?? lastDesign.structure,
      hologram: options.hologram ?? lastDesign.hologram
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

  return {
    ticketDesign,
    handleChangeAnimation,
    handleChangeStructure,
    handleChangeColor,
    handleChangeHologram
  }
}

const INITIAL_STATE = {
  animation: PERSONALIZE_TIKET_OPTIONS.ANIMATION.DEFAULT,
  structure: PERSONALIZE_TIKET_OPTIONS.STRUCTURE.CIRCLE,
  color: PERSONALIZE_TIKET_OPTIONS.COLOR.BLUE,
  hologram: PERSONALIZE_TIKET_OPTIONS.HOLOGRAM[1]
}
