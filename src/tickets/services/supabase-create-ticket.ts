import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { SupabaseTicketData } from '../types/supabase-ticket-data'

interface Props {
  ticketInfo: Partial<SupabaseTicketData>
}

export const supabaseCreateTicket = async (req: any, res: any, { ticketInfo }: Props) => {
  const supabase = createSupabaseServerClient({ req, res })

  const { error } = await supabase.from(TICKET_DB_KEY).insert({
    ...ticketInfo
  })

  return {
    error
  }
}
