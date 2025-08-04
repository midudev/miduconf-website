import { RefObject, useLayoutEffect, useState } from 'react'
import { transformElementToJpeg } from '../utils/transform-element-to-jpeg'

interface Props {
  ticketDOMContnet: RefObject<HTMLElement | null>
}

export const useDownloadTicketImage = ({ ticketDOMContnet }: Props) => {
  const [sharedTicketImageLink, setSharedTicketImageLink] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (ticketDOMContnet?.current == null) return

    handleCreateImageImage()
  }, [ticketDOMContnet?.current])

  const handleCreateImageImage = async () => {
    if (ticketDOMContnet?.current == null) return

    const { dataURL } = await transformElementToJpeg({ ticketDOMContnet: ticketDOMContnet.current })
    setSharedTicketImageLink(dataURL)
  }

  return {
    sharedTicketImageLink,
    handleCreateImageImage
  }
}
