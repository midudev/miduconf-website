interface Props {
  username: string
  ticketNumber: number
}

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

export const getTicketMetadata = ({ username, ticketNumber }: Props) => {
  const title = 'miduConf 2025 - Conferencia de Programación y Tecnología'
  const description =
    '¡No te pierdas la miduConf 2025 el 10 de SEPTIEMBRE! Charlas para todos los niveles ¡y muchas sorpresas!'
  const hash = crypto.randomUUID().split('-')[0]

  const url = `https://miduconf.com/ticket/${username}/${hash}`
  const ogImage = `${PREFIX_CDN}/ticket-${ticketNumber}.jpg?${hash}=_buster`

  return {
    title,
    description,
    ogImage,
    url
  }
}
