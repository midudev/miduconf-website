import Matter from 'matter-js'
import { AnimationModule, AnimationContext } from './types'
import { createShape, createBoundaries, createMouseConstraint } from './utils'

export const ballPoolAnimation: AnimationModule = {
  name: 'Ball Pool',
  
  setup: (context: AnimationContext) => {
    const { engine, world, render, config } = context
    const { width, height, structure, isMobile } = config

    // Set gravity for ball pool effect (lighter on mobile)
    engine.world.gravity.y = isMobile ? 0.3 : 0.5

    // Add boundaries
    const boundaries = createBoundaries(width, height)
    Matter.Composite.add(world, boundaries)

    // Add mouse control for interactive play (only on desktop)
    if (!isMobile) {
      const mouseConstraint = createMouseConstraint(engine, render)
      Matter.Composite.add(world, mouseConstraint)
    }

    // Create a smaller pool of objects - highly optimized
    const poolHeight = height * (isMobile ? 0.15 : 0.2)
    const objectSize = isMobile ? 8 : 12
    const spacing = objectSize + (isMobile ? 8 : 6)
    
    // Calculate grid dimensions - much more conservative
    const cols = Math.floor((width - (isMobile ? 120 : 100)) / spacing)
    const rows = Math.floor(poolHeight / spacing)
    
    // Drastically reduce maximum elements
    const maxElements = isMobile ? 8 : 15
    let elementCount = 0
    
    // Create stacked pool at bottom
    for (let row = 0; row < rows && elementCount < maxElements; row++) {
      for (let col = 0; col < cols && elementCount < maxElements; col++) {
        // Offset every other row for better packing
        const xOffset = (row % 2) * (spacing / 2)
        const x = (isMobile ? 50 : 40) + col * spacing + xOffset + Math.random() * 4
        const y = height - (isMobile ? 50 : 40) - row * spacing + Math.random() * 4
        
        const shape = createShape(x, y, structure as any)
        
        // Add smaller size variation to pool objects (even smaller on mobile)
        const baseScale = isMobile ? 0.6 : 0.8
        const scaleVariation = baseScale + Math.random() * (isMobile ? 0.2 : 0.4)
        Matter.Body.scale(shape, scaleVariation, scaleVariation)
        
        // Use consistent gray color - no need to override since createShape already sets it
        // shape.render.fillStyle is already set by createShape
        
        // Add slight random velocity for natural settling (less on mobile)
        const velocityMultiplier = isMobile ? 0.3 : 0.5
        Matter.Body.setVelocity(shape, {
          x: (Math.random() - 0.5) * velocityMultiplier,
          y: (Math.random() - 0.5) * velocityMultiplier
        })
        
        Matter.Composite.add(world, shape)
        elementCount++
      }
    }

    // Skip falling objects entirely for better performance
    // const fallingCount = 0
  },

  cleanup: () => {
    // No intervals to clean up for screenshot-optimized version
  }
}