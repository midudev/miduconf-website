import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { SupabaseTicketData } from '../types/supabase-ticket-data'

interface Props {
  ticketInfo: Partial<SupabaseTicketData>
  username: string
}

export const supabaseUpdateTicket = async (req: any, res: any, { ticketInfo, username }: Props) => {
  const supabase = createPagesServerClient({ req, res })

  const { error } = await supabase
    .from(TICKET_DB_KEY)
    .update({
      ...ticketInfo
    })
    .eq('user_name', username)

  return {
    error
  }
}
