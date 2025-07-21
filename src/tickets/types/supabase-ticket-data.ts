export interface SupabaseTicketData {
  created_at: string | null
  flavour: string | null
  id: string
  image: string | null
  material: string
  stickers: string[] | null
  ticket_number: number
  twitch_tier: string | null
  user_fullname: string | null
  user_id: string | null
  user_name: string | null
}
