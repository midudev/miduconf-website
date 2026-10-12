import { createBrowserClient } from '@supabase/ssr'

let client

export const getSupabaseBrowserClient = () => {
	if (client == null) {
		client = createBrowserClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
		)
	}

	return client
}
