import Matter from 'matter-js'
import { StructureType } from './types'
import { createSVGTexture } from './svg-renderer'

export const createShape = (x: number, y: number, structure: StructureType): Matter.Body => {
  const baseSize = 14 + Math.random() * 6 // Smaller for better performance
  const opacity = 0.4 + Math.random() * 0.3 // 0.4 to 0.7 - better visibility with solid color
  
  // Create SVG texture with gray color - exact shape from icons
  const grayColor = `rgba(129, 133, 143, ${opacity})` // #81858F with opacity
  const svgTexture = createSVGTexture(structure, Math.floor(baseSize * 1.2), grayColor)
  
  // Visual properties for different structures using SVG textures
  const getStructureProps = (structureType: StructureType) => {
    const baseProps = {
      render: {
        fillStyle: `rgba(129, 133, 143, ${opacity * 0.3})`, // Subtle fill as fallback
        strokeStyle: 'transparent',
        lineWidth: 0,
        sprite: {
          texture: svgTexture,
          xScale: 1,
          yScale: 1
        }
      }
    }

    switch (structureType) {
      case 'circle':
        return {
          ...baseProps,
          restitution: 0.3, // Less bouncy for more realistic rolling
          friction: 0.4, // More friction for controlled sliding
          frictionAir: 0.02 // Natural air resistance
        }
      case 'piramide':
        return {
          ...baseProps,
          restitution: 0.2, // Minimal bounce
          friction: 0.6, // Higher friction for stability
          frictionAir: 0.025
        }
      case 'prism':
        return {
          ...baseProps,
          restitution: 0.25,
          friction: 0.5, // Good friction for sliding
          frictionAir: 0.022
        }
      case 'background':
        return {
          ...baseProps,
          restitution: 0.25,
          friction: 0.5, // Good friction for sliding
          frictionAir: 0.022
        }
      case 'heart':
        return {
          ...baseProps,
          restitution: 0.35, // Slightly more bouncy but still controlled
          friction: 0.3, // Medium friction
          frictionAir: 0.018
        }
      default: // box
        return {
          ...baseProps,
          restitution: 0.3,
          friction: 0.4, // Natural friction
          frictionAir: 0.02
        }
    }
  }

  const props = getStructureProps(structure)

  switch (structure) {
    case 'circle':
      return Matter.Bodies.circle(x, y, baseSize / 2, props)
    case 'piramide':
      return Matter.Bodies.polygon(x, y, 3, baseSize / 2, props)
    case 'prism':
      return Matter.Bodies.polygon(x, y, 6, baseSize / 2, props)
    case 'background':
      return Matter.Bodies.rectangle(x, y, baseSize * 1.2, baseSize * 0.8, props)
    case 'heart':
      return Matter.Bodies.circle(x, y, baseSize / 2, props)
    default: // box
      return Matter.Bodies.rectangle(x, y, baseSize, baseSize, props)
  }
}

export const createBoundaries = (width: number, height: number): Matter.Body[] => {
  return [
    Matter.Bodies.rectangle(width / 2, height + 25, width, 50, { 
      isStatic: true, 
      render: { fillStyle: 'transparent' } 
    }),
    Matter.Bodies.rectangle(-25, height / 2, 50, height, { 
      isStatic: true, 
      render: { fillStyle: 'transparent' } 
    }),
    Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { 
      isStatic: true, 
      render: { fillStyle: 'transparent' } 
    })
  ]
}

export const createMouseConstraint = (engine: Matter.Engine, render: Matter.Render): Matter.MouseConstraint => {
  const mouse = Matter.Mouse.create(render.canvas)
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  })
  render.mouse = mouse
  return mouseConstraint
}