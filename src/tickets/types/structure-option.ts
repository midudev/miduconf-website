import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'

export type StructureOpcion =
  (typeof PERSONALIZE_TIKET_OPTIONS.STRUCTURE)[keyof typeof PERSONALIZE_TIKET_OPTIONS.STRUCTURE]
