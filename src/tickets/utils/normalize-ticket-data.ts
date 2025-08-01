import { SupabaseTicketData } from '../types/supabase-ticket-data'

export const normalizeTicketData = ({
  created_at,
  ticket_number,
  twitch_tier,
  user_fullname,
  user_id,
  user_name,
  midudev_token_id,
  midudev_type_sub,
  ...restOfProps
}: Partial<SupabaseTicketData>) => {
  return {
    createdAt: created_at,
    ticketNumber: ticket_number,
    twitchTier: twitch_tier,
    userFullname: user_fullname,
    userId: user_id,
    username: user_name,
    midudevTokentId: midudev_token_id,
    midudevTypeSub: midudev_type_sub,
    ...restOfProps
  }
}
