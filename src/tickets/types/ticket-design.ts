import { AnimationOption } from './animation-option'
import { ColorOption } from './color-option'
import { HologramOption } from './hologram-option'
import { StickerOption } from './sticker-option'
import { StructureOpcion } from './structure-option'

export interface TicketDesign {
  animation: AnimationOption
  structure: StructureOpcion
  color: ColorOption
  hologram: HologramOption
  sticker: Array<StickerOption | null> | null
}
