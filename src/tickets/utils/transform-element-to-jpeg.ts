import { toJpeg } from 'html-to-image'

interface Props {
  ticketDOMContnet: HTMLElement
}

export const transformElementToJpeg = async ({ ticketDOMContnet }: Props) => {
  // Wait a bit for animations to settle before capturing
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const dataURL = await toJpeg(ticketDOMContnet, {
    quality: 0.8,
    pixelRatio: 2, // Higher resolution for better quality
    skipAutoScale: true,
    // Handle CSS transforms and 3D effects
    style: {
      transform: 'none', // Reset transforms for clean capture
      transformStyle: 'flat' // Flatten 3D transforms
    },
    // Capture function to handle special elements
    filter: (node: Element) => {
      // Always include canvas elements (physics background)
      if (node.tagName === 'CANVAS') {
        return true
      }
      // Include all other elements by default
      return true
    }
  })

  return {
    dataURL
  }
}
