import Matter from 'matter-js'
import { AnimationModule, AnimationContext } from './types'
import { createShape, createBoundaries, createMouseConstraint } from './utils'

export const pyramidAnimation: AnimationModule = {
  name: 'Pyramid',
  
  setup: (context: AnimationContext) => {
    const { engine, world, render, config } = context
    const { width, height, structure, isMobile } = config

    // Set gravity for pyramid stacking (lighter for performance)
    engine.world.gravity.y = isMobile ? 0.5 : 0.6

    // Add boundaries
    const boundaries = createBoundaries(width, height)
    Matter.Composite.add(world, boundaries)

    // Calculate pyramid dimensions - much smaller for performance
    const pyramidHeight = height * (isMobile ? 0.25 : 0.35)
    const objectSize = isMobile ? 16 : 20
    const spacing = objectSize + (isMobile ? 4 : 3)
    
    // Calculate number of rows - significantly reduced
    const maxRows = Math.min(Math.floor(pyramidHeight / spacing), isMobile ? 4 : 6)
    // Calculate base width to fit ticket width
    const maxCols = Math.min(Math.floor((width - 80) / spacing), maxRows + (isMobile ? 2 : 4))
    
    // Create large pyramid structure reaching half ticket height
    for (let row = 0; row < maxRows; row++) {
      const colsInRow = Math.max(1, maxCols - row)
      for (let col = 0; col < colsInRow; col++) {
        const x = width / 2 - ((colsInRow - 1) * spacing) / 2 + col * spacing
        const y = height - 30 - row * spacing
        const shape = createShape(x, y, structure as any)
        
        // Make objects moderately sized for performance
        const scale = isMobile ? 1.0 : 1.2
        Matter.Body.scale(shape, scale, scale)
        
        // Use consistent gray color - no need to override since createShape already sets it
        // shape.render.fillStyle is already set by createShape
        
        Matter.Composite.add(world, shape)
      }
    }

    // Reduce falling objects for performance - skip entirely on mobile
    const fallingCount = isMobile ? 0 : 2
    for (let i = 0; i < fallingCount; i++) {
      const x = width / 2 + (Math.random() - 0.5) * (width * 0.4)
      const y = -30 - (i * 30)
      const shape = createShape(x, y, structure as any)
      
      // Add slight horizontal velocity toward center
      const velocityX = (width / 2 - x) * 0.001
      Matter.Body.setVelocity(shape, {
        x: velocityX + (Math.random() - 0.5) * 0.5,
        y: Math.random() * 0.3
      })
      
      // Moderate size variation for impact
      const scaleVariation = 1.2 + Math.random() * 0.4
      Matter.Body.scale(shape, scaleVariation, scaleVariation)
      
      // Use consistent gray color - no need to override since createShape already sets it
      // shape.render.fillStyle is already set by createShape
      
      Matter.Composite.add(world, shape)
    }

    // Add mouse control only on desktop for pyramid interaction
    if (!isMobile) {
      const mouseConstraint = createMouseConstraint(engine, render)
      Matter.Composite.add(world, mouseConstraint)
    }
  },

  cleanup: () => {
    // No intervals to clean up for screenshot-optimized version
  }
}