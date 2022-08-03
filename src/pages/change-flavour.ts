import { supabase } from '../lib/supabase'

export async function post ({ request }) {
	const { flavour } = await request.json()

	const accessToken = request.headers.get('x-supabase-auth')

	// You can now use it within a Supabase Client
	const { user } = supabase.auth.setAuth(accessToken)

	if (!user) {
		return new Response(JSON.stringify({ message: 'Invalid access token' }), { status: 401 })
	}

	// This client will now send requests as this user
	const { error } = await supabase.from('ticket').update({ flavour }).match({ user_id: user.id })

	if (error) {
		return new Response(JSON.stringify({ message: 'Error updating flavour' }), { status: 400 })
	}

	return new Response(JSON.stringify({ message: 'ok' }), {
		status: 200
	})
}
