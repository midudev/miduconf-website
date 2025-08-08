type TwitchLevel = '1' | '2' | '3' | null
type AcademyLevel = 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null

const TWITCH_LEVELS: Record<NonNullable<TwitchLevel>, number> = {
  '1': 1,
  '2': 2,
  '3': 3
}

const ACADEMY_LEVELS: Record<NonNullable<AcademyLevel>, number> = {
  monthly: 1,
  quarterly: 2,
  annual: 3,
  lifetime: 3
}

export const getMaxStickersUnlock = (twitchTier?: TwitchLevel, midudevTypeSub?: AcademyLevel) => {
  const currentTwitchLevel = twitchTier ? TWITCH_LEVELS[twitchTier] : 0
  const currentAcademyLevel = midudevTypeSub ? ACADEMY_LEVELS[midudevTypeSub] : 0

  const maxSticker = Math.max(currentTwitchLevel, currentAcademyLevel)
  return maxSticker
}
