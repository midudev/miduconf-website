import { useEffect } from 'preact/hooks'
import { useProgressiveNumber } from '@hooks/useProgressiveNumber'
import { supabase } from 'src/lib/supabase.js'

export const TicketsSold = () => {
	const [tickets, setTickets] = useProgressiveNumber(0)

	useEffect(() => {
		async function fetchTickets () {
			const { count } = await supabase.from('ticket').select('*', { count: 'exact', head: true })
			setTickets(count)
		}
		fetchTickets()
	}, [])

	return (
		<strong class='text-gray-700 text-center text-xl flex items-center justify-center space-x-4 my-2'>
      ¡Se repartieron <span class='text-4xl font-black bg-clip-text text-transparent mx-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'>{tickets.toFixed(0).toString()}</span> tickets!
		</strong>
	)
}
