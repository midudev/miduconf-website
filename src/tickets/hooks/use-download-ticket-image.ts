import { useLayoutEffect, useState } from 'react'
import { transformElementToJpeg } from '../utils/transform-element-to-jpeg'

interface Props {
  ticketDOMContnet: HTMLElement | null
}

export const useDownloadTicketImage = ({ ticketDOMContnet }: Props) => {
  const [sharedTicketImageLink, setSharedTicketImageLink] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (sharedTicketImageLink != null) return

    handleCreateImageImage()
  }, [ticketDOMContnet])

  const handleCreateImageImage = async () => {
    if (ticketDOMContnet == null) return

    const { dataURL } = await transformElementToJpeg({ ticketDOMContnet })
    setSharedTicketImageLink(dataURL)
  }

  return {
    sharedTicketImageLink,
    handleCreateImageImage
  }
}
