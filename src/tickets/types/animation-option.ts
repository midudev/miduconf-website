import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'

export type AnimationOption =
  (typeof PERSONALIZE_TIKET_OPTIONS.ANIMATION)[keyof typeof PERSONALIZE_TIKET_OPTIONS.ANIMATION]
