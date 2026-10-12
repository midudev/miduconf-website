import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'

export const createSupabaseServerClient = ({ req, res }) =>
	createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				return parseCookieHeader(req.headers.cookie ?? '')
			},
			setAll(cookiesToSet) {
				const previous = res.getHeader('Set-Cookie') ?? []
				const current = Array.isArray(previous) ? previous : [String(previous)]

				res.setHeader(
					'Set-Cookie',
					[
						...current,
						...cookiesToSet.map(({ name, value, options }) =>
							serializeCookieHeader(name, value, options)
						)
					]
				)
			}
		}
	})
