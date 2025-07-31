import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { SupabaseTicketData } from '../types/supabase-ticket-data'

interface UseUpdateTicketInDBProps {
  ticketInfo: Partial<SupabaseTicketData>
  username: string
}

export const useUpdateTicketInDB = () => {
  const supabase = useSupabaseClient()

  const handleUpdateTicket = async ({ ticketInfo, username }: UseUpdateTicketInDBProps) => {
    const { error, data } = await supabase
      .from(TICKET_DB_KEY)
      .update({
        hologram: ticketInfo.hologram
      })
      .eq('user_name', username)

    if (error) {
      console.error('[update-ticket-error]: ', error)
    }

    return {
      error
    }
  }

  return {
    handleUpdateTicket
  }
}
