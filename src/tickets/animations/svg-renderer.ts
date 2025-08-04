import { StructureType } from './types'

// SVG paths for each structure - exact copies from structure-ticket icons
const SVG_PATHS = {
  box: {
    viewBox: '0 0 30 31',
    paths: ['M3 3.39062V0.390625H27V3.39062H30V27.3906H27V30.3906H3V27.3906H0V3.39062H3Z'],
    width: 30,
    height: 31
  },
  circle: {
    viewBox: '0 0 30 31',
    paths: ['M23.335 3.72412H6.66797V3.7251H23.335V3.72412H26.668V7.05713H30.001V23.7251H26.6689V23.7261H26.668V27.0581H23.3359V27.0601H23.335V30.3911H6.66699V27.0581H3.33398V23.7251H0V7.05713H3.33398V3.72412H6.66699V0.390137H23.335V3.72412Z'],
    width: 30,
    height: 31
  },
  piramide: {
    viewBox: '0 0 30 18',
    paths: [
      'M25.7143 13.6763H30V17.962H25.7143V13.6763Z',
      'M0 13.6763H4.28571V17.962H0V13.6763Z', 
      'M25.7143 17.962H30V13.6763H25.7143V17.962Z',
      'M21.4286 17.962H25.7143V9.39061H21.4286V17.962Z',
      'M17.1429 17.962H21.4286V5.1049H17.1429V17.962Z',
      'M12.8571 17.962H17.1429V0.819183H12.8571V17.962Z',
      'M8.57143 17.962H12.8571V5.1049H8.57143V17.962Z',
      'M4.28571 17.962H8.57143V9.39061H4.28571V17.962Z',
      'M0 17.962H4.28571V13.6763H0V17.962Z'
    ],
    width: 30,
    height: 18
  },
  prism: {
    viewBox: '0 0 30 31',
    paths: [
      'M25.7143 13.2478H30V17.5335H25.7143V13.2478Z',
      'M21.4286 13.2478H25.7143V21.8192H21.4286V13.2478Z',
      'M17.1429 13.2478H21.4286V26.1049H17.1429V13.2478Z',
      'M12.8571 13.2478H17.1429V30.3906H12.8571V13.2478Z',
      'M8.57143 13.2478H12.8571V26.1049H8.57143V13.2478Z',
      'M4.28571 13.2478H8.57143V21.8192H4.28571V13.2478Z',
      'M0 13.2478H4.28571V17.5335H0V13.2478Z',
      'M25.7143 17.5335H30V13.2478H25.7143V17.5335Z',
      'M21.4286 17.5335H25.7143V8.96205H21.4286V17.5335Z',
      'M17.1429 17.5335H21.4286V4.67634H17.1429V17.5335Z',
      'M12.8571 17.5335H17.1429V0.390625H12.8571V17.5335Z',
      'M8.57143 17.5335H12.8571V4.67634H8.57143V17.5335Z',
      'M4.28571 17.5335H8.57143V8.96205H4.28571V17.5335Z',
      'M0 17.5335H4.28571V13.2478H0V17.5335Z'
    ],
    width: 30,
    height: 31
  },
  heart: {
    viewBox: '0 0 29 28',
    paths: ['M19.0908 24.9365H16.3643V27.6631H13.6367V5.8457H16.3633V3.11914H19.0908V24.9365ZM10.9102 3.11914H13.6357V24.9365H10.9082V22.208H8.18164V19.4814H5.45508V16.7549H2.72852V3.11914H5.45508V0.390625H10.9102V3.11914ZM24.5459 3.11914H27.2725V5.8457H29.999V14.0273H27.2725V16.7549H24.5459V19.4814H21.8193V22.208H19.0918V0.390625H24.5459V3.11914ZM2.72754 14.0273H0V5.8457H2.72754V14.0273Z'],
    width: 29,
    height: 28
  },
  background: {
    viewBox: '0 0 30 31',
    paths: ['M0 0.390625H30V30.3906H0V0.390625ZM3 3.39062V9.39062H9V15.3906H3V21.3906H9V27.3906H15V21.3906H21V27.3906H27V21.3906H21V15.3906H27V9.39062H21V3.39062H15V9.39062H9V3.39062H3ZM15 15.3906H9V21.3906H15V15.3906ZM15 9.39062V15.3906H21V9.39062H15Z'],
    width: 30,
    height: 31
  }
}

// Create a canvas with the SVG rendered
export const createSVGCanvas = (structure: StructureType, size: number, color: string = 'rgba(255, 255, 255, 0.9)'): HTMLCanvasElement => {
  const svgData = SVG_PATHS[structure]
  if (!svgData) {
    throw new Error(`No SVG data found for structure: ${structure}`)
  }

  // Create canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  
  // Set canvas size
  canvas.width = size
  canvas.height = size
  
  // Create SVG string with multiple paths if needed
  const pathElements = svgData.paths.map(path => `<path d="${path}" fill="${color}"/>`).join('')
  const svgString = `
    <svg width="${size}" height="${size}" viewBox="${svgData.viewBox}" xmlns="http://www.w3.org/2000/svg">
      ${pathElements}
    </svg>
  `
  
  // Convert SVG to image and draw on canvas
  const img = new Image()
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)
  
  return new Promise<HTMLCanvasElement>((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      URL.revokeObjectURL(url)
      resolve(canvas)
    }
    img.src = url
  }) as any // We'll handle this differently
}

// Synchronous version for Matter.js with enhanced styling
export const createSVGTexture = (structure: StructureType, size: number, color: string = 'rgba(255, 255, 255, 0.9)'): string => {
  const svgData = SVG_PATHS[structure]
  if (!svgData) {
    return '' // fallback
  }

  // Create simple solid color SVG - no effects for better performance
  const pathElements = svgData.paths.map(path => `<path d="${path}" fill="${color}"/>`).join('')
  const svgString = `
    <svg width="${size}" height="${size}" viewBox="${svgData.viewBox}" xmlns="http://www.w3.org/2000/svg">
      ${pathElements}
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(svgString)}`
}

// Get appropriate physics shape for each structure
export const getPhysicsShape = (structure: StructureType, x: number, y: number, size: number) => {
  switch (structure) {
    case 'box':
      return { type: 'rectangle', x, y, width: size, height: size }
    case 'circle':
      return { type: 'circle', x, y, radius: size / 2 }
    case 'piramide':
      return { type: 'polygon', x, y, sides: 3, radius: size / 2 }
    case 'prism':
      return { type: 'polygon', x, y, sides: 6, radius: size / 2 }
    case 'heart':
      return { type: 'circle', x, y, radius: size / 2 } // Use circle for heart physics approximation
    case 'background':
      return { type: 'rectangle', x, y, width: size, height: size }
    default:
      return { type: 'rectangle', x, y, width: size, height: size }
  }
}