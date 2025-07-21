import { supabaseGetTotalTicketsNumber } from '@/tickets/services/supabase-get-total-tickets-number'

export default async function handler(req, res) {
  try {
    const count = await supabaseGetTotalTicketsNumber(req, res)
    return res.status(200).json({ number: count })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}
