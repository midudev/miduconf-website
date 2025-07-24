import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'

export type StickerOption =
  (typeof PERSONALIZE_TIKET_OPTIONS.STICKER)[keyof typeof PERSONALIZE_TIKET_OPTIONS.STICKER]
