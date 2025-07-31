import { HologramOption } from './hologram-option'

export interface SupabaseTicketData {
  created_at: string | null
  id: string
  image: string | null
  hologram: HologramOption
  ticket_number: number
  twitch_tier: '1' | '2' | '3' | null
  user_fullname: string | null
  user_id: string | null
  user_name: string | null
  midudev_token_id: string
  midudev_type_sub: string | null
}
