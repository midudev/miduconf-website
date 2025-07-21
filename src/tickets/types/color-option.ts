import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'

export type ColorOption =
  (typeof PERSONALIZE_TIKET_OPTIONS.COLOR)[keyof typeof PERSONALIZE_TIKET_OPTIONS.COLOR]
