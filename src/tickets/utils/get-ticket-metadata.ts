interface Props {
  username: string
  ticketNumber: number
  fullname?: string
}

export const getTicketMetadata = ({ username, ticketNumber, fullname }: Props) => {
  const title = `${fullname || username} - miduConf 2025`
  const description =
    '¡Mira mi ticket para la miduConf 2025! No te pierdas la conferencia el 10 de SEPTIEMBRE. Charlas para todos los niveles ¡y muchas sorpresas!'

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

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/ticket-2025'
