import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

export const supabaseGetServerSession = async (req: any, res: any) => {
  const supabase = createPagesServerClient({ req, res })
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
