interface Props {
  username: string
  ticketNumber: number
  fullname?: string
}

export const getTicketMetadata = ({ username, ticketNumber, fullname }: Props) => {
  const title = `${fullname || username} - miduConf 2025`
  const description =
    '¡Mira mi ticket para la miduConf 2025! No te pierdas la conferencia el 10 de SEPTIEMBRE. Charlas para todos los niveles ¡y muchas sorpresas!'

  const url = `https://miduconf.com/ticket/${username}`
  const ogImage = `https://miduconf.com/api/og/ticket?username=${encodeURIComponent(username)}&ticketNumber=${ticketNumber}&fullname=${encodeURIComponent(fullname || username)}`

  return {
    title,
    description,
    ogImage,
    url
  }
}
