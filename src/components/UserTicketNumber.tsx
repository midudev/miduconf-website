import { useTicket } from "@hooks/useTicket"
import { useProgressiveNumber } from "@hooks/useProgressiveNumber"
import { useEffect } from "preact/hooks"

export const UserTicketNumber = () => {
  const ticket = useTicket()
  const [number, setNumber] = useProgressiveNumber(0)

  useEffect(() => {
    if (ticket?.ticket_number) {
      setNumber(ticket.ticket_number)
    }
  }, [ticket])

  return <div>#{number?.toFixed(0).padStart(5, '0')}</div>
}
