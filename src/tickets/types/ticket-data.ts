export interface TicketData {
  createdAt: string | null
  id: string
  image: string | null
  hologram: string
  ticketNumber: number
  twitchTier: '1' | '2' | '3' | null
  userFullname: string | null
  userId: string | null
  userame: string | null
}
