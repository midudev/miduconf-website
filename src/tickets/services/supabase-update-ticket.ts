import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { SupabaseTicketData } from '../types/supabase-ticket-data'

interface Props {
  ticketInfo: Partial<SupabaseTicketData>
  userId: string
}

export const supabaseUpdateTicket = async (req: any, res: any, { ticketInfo, userId }: Props) => {
  const supabase = createSupabaseServerClient({ req, res })

  const { error } = await supabase
    .from(TICKET_DB_KEY)
    .update({
      ...ticketInfo
    })
    .eq('user_id', userId)

  return {
    error
  }
}
