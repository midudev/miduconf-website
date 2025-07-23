import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { TicketDesign } from '../types/ticket-design'

interface UseUpdateTicketInDBProps {
  ticketDesign: TicketDesign
  username: string
}

export const useUpdateTicketInDB = () => {
  const supabase = useSupabaseClient()

  const handleUpdateTicket = async ({ ticketDesign, username }: UseUpdateTicketInDBProps) => {
    const { error } = await supabase
      .from(TICKET_DB_KEY)
      .update({
        hologram: ticketDesign.hologram
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
