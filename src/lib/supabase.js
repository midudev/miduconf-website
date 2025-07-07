import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const supabaseAcademyURL = 'https://vvimuilmzwgmuyepndjd.supabase.co'
export const supabaseAdminAcademy = createClient(
	supabaseAcademyURL,
	process.env.SUPABASE_ACADEMY_ADMIN_KEY
)
