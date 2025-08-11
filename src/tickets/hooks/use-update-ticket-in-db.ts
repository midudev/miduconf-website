import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { TICKET_DB_KEY } from '../config/ticket-db-key'
import { SupabaseTicketData } from '../types/supabase-ticket-data'
import { TicketDesign } from '../types/ticket-design'

interface UseUpdateTicketInDBProps {
  ticketInfo: Partial<SupabaseTicketData>
  username: string
}

interface UseUpdateTicketDesignInDBProps {
  ticketDesign: TicketDesign
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

  const handleUpdateTicketDesign = async ({ ticketDesign, username }: UseUpdateTicketDesignInDBProps) => {
    const designData = JSON.stringify({
      hologram: ticketDesign.hologram,
      color: ticketDesign.color,
      structure: ticketDesign.structure,
      animation: ticketDesign.animation,
      sticker: ticketDesign.sticker,
      _metadata: { type: 'design_data', version: '1.0' }
    })

    const { error, data } = await supabase
      .from(TICKET_DB_KEY)
      .update({
        design_data: designData
      })
      .eq('user_name', username)

    if (error) {
      console.error('[update-ticket-design-error]: ', error)
    } else {
      // Also update localStorage to keep in sync
      try {
        localStorage.setItem(`ticket_design_${username}`, designData)
      } catch (localError) {
        console.warn('Could not update localStorage:', localError)
      }
    }

    return {
      error
    }
  }

  return {
    handleUpdateTicket,
    handleUpdateTicketDesign
  }
}
