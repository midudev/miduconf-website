import { useState } from 'preact/hooks'
import { useEffect } from 'preact/hooks'
import { supabase } from 'src/lib/supabase.js'

export const useTicket = () => {
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    const username = params.get('username')

    const fetchTicketInfo = async () => {
      const { error, data } = await supabase
        .from('ticket')
        .select('*')
        .eq('user_name', username)

      if (error) {
        console.error(error)
        return
      }

      if (data.length === 0) {
        console.error('No ticket found for user:', username)
        // TODO: Create a 404 error
        return
      }

      const [ticketInfo] = data

      setTimeout(() => {
        document.querySelector('.atropos').setAttribute('data-ready', '')
      }, 250)

      setTicket(ticketInfo)
    }

    fetchTicketInfo()
  }, [])

  return ticket
}