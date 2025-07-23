import { transformElementToJpeg } from './transform-element-to-jpeg'

interface Props {
  ticketDOMContnet: HTMLElement
  ticketNumber: number
}

export const createTicketImage = async ({ ticketDOMContnet, ticketNumber }: Props) => {
  const { dataURL } = await transformElementToJpeg({ ticketDOMContnet })

  const fileImage = await dataUrlToFile(dataURL, 'ticket.jpg')
  const filename = `ticket-${ticketNumber}.jpg`

  return {
    fileImage,
    filename
  }
}

const dataUrlToFile = async (dataUrl: string, filename: string) => {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return new File([blob], filename, { type: 'image/jpg' })
}
