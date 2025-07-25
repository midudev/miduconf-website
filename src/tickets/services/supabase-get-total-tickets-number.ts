import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { TICKET_DB_KEY } from '../config/ticket-db-key'

export const supabaseGetTotalTicketsNumber = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createPagesServerClient({ req, res })
    const { count, error } = await supabase
      .from(TICKET_DB_KEY)
      .select('*', { count: 'exact', head: true })

    if (error || count == null) {
      throw new Error('Imposible get Number of total tickets', {
        cause: error
      })
    }

    return count + 1
  } catch (err) {
    console.error(err)
    throw err
  }
}
