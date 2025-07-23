import { useLayoutEffect, useState } from 'react'
import { transformElementToJpeg } from '../utils/transform-element-to-jpeg'

interface Props {
  ticketDOMContnet: HTMLElement | null
}

export const useDownloadTicketImage = ({ ticketDOMContnet }: Props) => {
  const [sharedTicketImageLink, setSharedTicketImageLink] = useState<string | null>(null)

  useLayoutEffect(() => {
    console.log({ sharedTicketImageLink, ticketDOMContnet })
    if (sharedTicketImageLink != null) return

    handleDownloadImage()
  }, [ticketDOMContnet])

  const handleDownloadImage = async () => {
    if (ticketDOMContnet == null) return

    const { dataURL } = await transformElementToJpeg({ ticketDOMContnet })
    setSharedTicketImageLink(dataURL)
  }

  return {
    sharedTicketImageLink,
    handleDownloadImage
  }
}
