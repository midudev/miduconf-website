import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdminAcademy } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const authorizationCode = getTwitchAuthorizationCode(req)

		const { error: accessTokenErrorMessage, accessToken } = await getTwitchAccessToken(
			authorizationCode
		)

		if (accessTokenErrorMessage != null)
			return res.status(400).json({ message: accessTokenErrorMessage })

		const { error: userIdErrorMessage, userId } = await getTwitchUserIdByAccessToken(accessToken)

		if (userIdErrorMessage != null) return res.status(400).json({ message: userIdErrorMessage })

		const { data: initialAchievements, error: achievementsError } = await supabaseAdminAcademy
			.from('achievements')
			.select('*')
			.eq('twitch_id', userId)
			.maybeSingle()

		if (achievementsError != null) {
			return res.status(500).json({
				error: 'Error getting achievements'
			})
		}

		const MIDUCONF_ACHIEVEMENT = 'miduconf-2024'

		const achievementsToSave = new Set(initialAchievements?.achievements ?? [])
		achievementsToSave.add(MIDUCONF_ACHIEVEMENT)

		const achievements = initialAchievements
			? {
					...initialAchievements,
					achievements: [...achievementsToSave.values()]
			  }
			: {
					twitch_id: userId,
					achievements: [MIDUCONF_ACHIEVEMENT]
			  }

		const { error: upsertAchievementsError } = await supabaseAdminAcademy
			.from('achievements')
			.upsert(achievements)
			.eq('twitch_id', userId)

		if (upsertAchievementsError) {
			console.log({ upsertAchievementsError })
			return res.status(500).json({
				error: 'Imposible save new achievement'
			})
		}

		return res.redirect(`/ticket?achievement-saved`)
	} catch (err) {
		console.log(err)
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
		process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/' : 'https://www.miduconf.com/'

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
				redirect_uri: `${rediectUri}api/twitch/signin/`
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
