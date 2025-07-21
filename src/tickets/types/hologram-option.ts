import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'

export type HologramOption =
  (typeof PERSONALIZE_TIKET_OPTIONS.HOLOGRAM)[keyof typeof PERSONALIZE_TIKET_OPTIONS.HOLOGRAM]
