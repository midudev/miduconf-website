import { toJpeg } from 'html-to-image'

interface Props {
  ticketDOMContnet: HTMLElement
}

export const transformElementToJpeg = async ({ ticketDOMContnet }: Props) => {
  const dataURL = await toJpeg(ticketDOMContnet, {
    quality: 0.8
  })

  return {
    dataURL
  }
}
