import { createSupabaseServerClient } from '@/lib/supabase-server'

export const supabaseGetServerSession = async (req: any, res: any) => {
  const supabase = createSupabaseServerClient({ req, res })
  const {
    error,
    data: { session }
  } = await supabase.auth.getSession()

  if (error) {
    throw new Error('Imposible get user session', {
      cause: error
    })
  }

  return {
    session,
    error
  }
}
