import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const authorizationCode = getTwitchAuthorizationCode(req)
		const requiredTier = req.query.requiredTier as '1' | '2' | '3'

		const { error: accessTokenErrorMessage, accessToken } = await getTwitchAccessToken(
			authorizationCode
		)

		if (accessTokenErrorMessage != null)
			return res.status(400).json({ message: accessTokenErrorMessage })

		const { error: userIdErrorMessage, userId } = await getTwitchUserIdByAccessToken(accessToken)

		if (userIdErrorMessage != null) return res.status(400).json({ message: userIdErrorMessage })

		const { error: tierErrorMessage, tier } = await getTwitchSubscriptionTier({
			accessToken,
			userId
		})

		const invalidTierRequiredMessage =
			tier != null && Number(tier) > Number(requiredTier) ? 'false' : 'true'

		const queryParam = new URLSearchParams({
			tier,
			notAccessTier: invalidTierRequiredMessage,
			error: tierErrorMessage
		})

		if (tierErrorMessage != null) return res.redirect(`/ticket?${queryParam}`)

		/* get userSession by supabase */
		const supabase = createPagesServerClient({
			req,
			res
		})

		const {
			error: errorSession,
			data: { session }
		} = await supabase.auth.getSession()

		const {
			user: { id: userSessionId }
		} = session

		/* update tier in supabase */
		await supabase
			.from('ticket')
			.update({
				twitch_tier: tier
			})
			.eq('user_id', userSessionId)

		return res.redirect(`/ticket?${queryParam}`)
	} catch (err) {
		if (err instanceof Error) {
			if (err.name === 'TwitchAuthorizationCodeError') {
				return res.status(400).json({ message: err.message })
			}

			if (err.name === 'TwitchAccessTokenError') {
				return res.status(400).json({ message: err.message })
			}

			if (err.name === 'TwitchUserIdError') {
				return res.status(400).json({ message: err.message })
			}

			if (err.name === 'TwitchClientIdError') {
				return res.status(500).json({ message: err.message })
			}

			if (err.name === 'TwitchClientSecretError') {
				return res.status(500).json({ message: err.message })
			}

			if (err.name === 'TwitchSubscriptionTierError') {
				return res.status(500).json({ message: err.message })
			}
		}
		console.log(err)
		return res.status(500).json({ message: 'Server Error' })
	}
}

const getTwitchAuthorizationCode = (req: NextApiRequest) => {
	const code = req.query.code as string
	if (code == null) throw new TwitchAuthorizationCodeError('No code provided')

	return code
}

/* ---- */

interface TwitchAccessTokenSuccessResponse {
	accessToken: string
	error: null
}

interface TwitchAccessTokenErrorResponse {
	accessToken: null
	error: string
}

type TwitchAccessTokenResponse = (
	authorizationCode: string
) => Promise<TwitchAccessTokenSuccessResponse | TwitchAccessTokenErrorResponse>

const getTwitchAccessToken: TwitchAccessTokenResponse = async (authorizationCode) => {
	if (authorizationCode == null) throw new TwitchAuthorizationCodeError('No code provided')

	const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
	const clientSecret = process.env.PRIVATE_TWITCH_CLIENT_SECRET

	const rediectUri =
		process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/' : 'https://miduconf.com/'

	if (clientId == null) throw new TwitchClientIdError('No Twitch Client ID provided')
	if (clientSecret == null) throw new TwitchClientSecretError('No Twitch Client Secret provided')

	try {
		const authUrl = new URL('https://id.twitch.tv/oauth2/token')

		const authResponse = await fetch(authUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: clientId,
				client_secret: clientSecret,
				code: authorizationCode,
				grant_type: 'authorization_code',
				redirect_uri: `${rediectUri}/api/special-ticket/twitch/`
			})
		})

		if (!authResponse.ok) throw new Error('Failed to get Twitch access token')

		const { access_token: accessToken } = await authResponse.json()

		return {
			accessToken,
			error: null
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to get Twitch access token'
		console.log(err)
		return {
			accessToken: null,
			error: message
		}
	}
}

class TwitchAuthorizationCodeError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'TwitchAuthorizationCodeError'
	}
}

class TwitchClientIdError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NoTwitchClientIdError'
	}
}

class TwitchClientSecretError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NoTwitchClientSecretError'
	}
}

class TwitchAccessTokenError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'TwitchAccessTokenError'
	}
}

class TwitchUserIdError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'TwitchUserIdError'
	}
}
/* ---- */

interface TwitchUserIdSuccessResponse {
	userId: string
	error: null
}

interface TwitchUserIdErrorResponse {
	userId: null
	error: string
}

type TwitchUserIdResponse = (
	accessToken: string
) => Promise<TwitchUserIdSuccessResponse | TwitchUserIdErrorResponse>

const getTwitchUserIdByAccessToken: TwitchUserIdResponse = async (accessToken) => {
	if (accessToken == null) throw new TwitchAccessTokenError('No access token provided')

	const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID

	if (clientId == null) throw new TwitchClientIdError('No Twitch Client ID provided')

	try {
		const userIdUrl = new URL('https://api.twitch.tv/helix/users')
		const userIdResponse = await fetch(userIdUrl, {
			headers: {
				'Client-ID': clientId,
				Authorization: `Bearer ${accessToken}`
			}
		})

		if (!userIdResponse.ok) throw new Error('Failed to get Twitch user ID')

		const {
			data: [{ id: userId }]
		} = await userIdResponse.json()

		return {
			userId,
			error: null
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to get Twitch user ID'

		return {
			userId: null,
			error: message
		}
	}
}

/* ---- */

interface TwitchSubscriptionTierSuccessResponse {
	tier: '1' | '2' | '3'
	error: null
}

interface TwitchSubscriptionTierErrorResponse {
	tier: null
	error: string
}

interface TwitchSubscriptionTierParams {
	accessToken: string
	userId: string
}

type TwitchSubscriptionTierResponse = (
	TwitchSubscriptionTierParams
) => Promise<TwitchSubscriptionTierSuccessResponse | TwitchSubscriptionTierErrorResponse>

const getTwitchSubscriptionTier: TwitchSubscriptionTierResponse = async ({
	accessToken,
	userId
}) => {
	if (accessToken == null) throw new TwitchAccessTokenError('No access token provided')
	if (userId == null) throw new TwitchUserIdError('No user ID provided')

	const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
	if (clientId == null) throw new TwitchClientIdError('No Twitch Client ID provided')

	try {
		const midudevId = '422915264'

		const tierUrl = new URL('https://api.twitch.tv/helix/subscriptions/user')
		tierUrl.searchParams.append('broadcaster_id', midudevId)
		tierUrl.searchParams.append('user_id', userId)

		const tierResponse = await fetch(tierUrl, {
			headers: {
				'Client-ID': clientId,
				Authorization: `Bearer ${accessToken}`
			}
		})

		if (!tierResponse.ok) {
			return {
				tier: null,
				error: 'This user has not subscribed to midudev'
			}
		}

		const { data } = await tierResponse.json()

		const tierFromAPI = String(data[0].tier) as string

		const acceptedTiers = ['1000', '2000', '3000']

		if (!acceptedTiers.includes(tierFromAPI)) throw new Error('Invalid Twitch subscription tier')

		return {
			tier: tierFromAPI.charAt(0) as '1' | '2' | '3',
			error: null
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to get Twitch subscription tier'

		return {
			tier: null,
			error: message
		}
	}
}
