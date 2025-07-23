import { AnimationOption } from './animation-option'
import { ColorOption } from './color-option'
import { HologramOption } from './hologram-option'
import { StructureOpcion } from './structure-option'

export interface TicketDesign {
  animation: AnimationOption
  structure: StructureOpcion
  color: ColorOption
  hologram: HologramOption
}
