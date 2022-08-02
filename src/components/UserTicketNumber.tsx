import { useProgressiveNumber } from "@hooks/useProgressiveNumber"
import { useEffect } from "preact/hooks"

export const UserTicketNumber = ({ ticketNumber }) => {
  const [number, setNumber] = useProgressiveNumber(0)

  useEffect(() => {
    setTimeout(() => {
      setNumber(+ticketNumber)
    }, 500)
  }, [ticketNumber])

  return <div>#{number?.toFixed(0).padStart(5, '0')}</div>
}
