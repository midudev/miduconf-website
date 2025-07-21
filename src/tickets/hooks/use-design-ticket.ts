import { useState } from 'react'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { AnimationOption } from '../types/animation-option'
import { StructureOpcion } from '../types/structure-option'
import { ColorOption } from '../types/color-option'

interface TicketDesignState {
  animation: AnimationOption
  structure: StructureOpcion
  color: ColorOption
}

export const useDesignTicket = () => {
  const [ticketDesign, setTicketDesign] = useState<TicketDesignState>(INITIAL_STATE)

  const handleChangeDesign = (options: Partial<TicketDesignState>) => {
    setTicketDesign((lastDesign) => ({
      animation: options.animation ?? lastDesign.animation,
      color: options.color ?? lastDesign.color,
      structure: options.structure ?? lastDesign.structure
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

  return {
    ticketDesign,
    handleChangeAnimation,
    handleChangeStructure
  }
}

const INITIAL_STATE = {
  animation: PERSONALIZE_TIKET_OPTIONS.ANIMATION.DEFAULT,
  structure: PERSONALIZE_TIKET_OPTIONS.STRUCTURE.CIRCLE,
  color: PERSONALIZE_TIKET_OPTIONS.COLOR.BLUE
}
