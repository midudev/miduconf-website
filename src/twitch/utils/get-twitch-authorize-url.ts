interface Props {
  requiredTier: '1' | '2' | '3'
  currentTier: string | null
}

export function getTwitchAuthorizeUrl({ requiredTier = '1', currentTier }: Props) {
  const redirectUrl =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://www.miduconf.com'

  const authorizeTwitchUrl = new URL('https://id.twitch.tv/oauth2/authorize')
  authorizeTwitchUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!)

  const redirectUri = new URL(
    `${redirectUrl}/api/special-ticket/twitch${currentTier == null ? '/' : ''}`
  )
  const requiredTierToSend = requiredTier === '2' ? '1' : requiredTier
  if (currentTier != null) redirectUri.searchParams.append('requiredTier', requiredTierToSend)

  authorizeTwitchUrl.searchParams.append('redirect_uri', redirectUri.href)
  authorizeTwitchUrl.searchParams.append('', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!)

  authorizeTwitchUrl.searchParams.append('scope', 'user:read:subscriptions')
  authorizeTwitchUrl.searchParams.append('response_type', 'code')

  return authorizeTwitchUrl.href
}
