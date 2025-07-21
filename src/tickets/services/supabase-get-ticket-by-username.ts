import { SupabaseTicketData } from './../types/supabase-ticket-data'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { normalizeTicketData } from '../utils/normalize-ticket-data'

interface Props {
  username: string
}

export const supabaseGetTicketByUsername = async (req: any, res: any, { username }: Props) => {
  try {
    const supabase = createPagesServerClient({ req, res })
    const { data, error } = await supabase
      .from(TICKET_DB_KEY)
      .select('*')
      .eq('user_name', username)
      .maybeSingle()

    if (error) {
      throw new Error('Error getting ticket information by username', {
        cause: error
      })
    }

    if (data == null) return null

    const normalizedData = normalizeTicketData(data as SupabaseTicketData)
    return normalizedData
  } catch (err) {
    console.error(err)
    throw err
  }
}
