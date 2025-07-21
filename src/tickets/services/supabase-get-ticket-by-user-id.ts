import { SupabaseTicketData } from './../types/supabase-ticket-data'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { normalizeTicketData } from '../utils/normalize-ticket-data'

interface Props {
  id: string
}

export const supabaseGetTicketByUserId = async (req: any, res: any, { id }: Props) => {
  try {
    const supabase = createPagesServerClient({ req, res })
    const { data, error } = await supabase
      .from(TICKET_DB_KEY)
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      throw new Error('Error getting ticket information by id', {
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
