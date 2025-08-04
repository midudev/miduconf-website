import Matter from 'matter-js'
import { AnimationModule, AnimationContext } from './types'
import { createShape, createBoundaries, createMouseConstraint } from './utils'

export const frictionAnimation: AnimationModule = {
  name: 'Orbital Motion',
  
  setup: (context: AnimationContext) => {
    const { engine, world, render, config } = context
    const { width, height, structure } = config

    // Disable world gravity - we'll handle forces manually
    engine.world.gravity.y = 0
    engine.world.gravity.x = 0

    // Add boundaries
    const boundaries = createBoundaries(width, height)
    Matter.Composite.add(world, boundaries)

    // Create central attracting body (more visible)
    const centerX = width / 2
    const centerY = height / 2
    const centralBody = Matter.Bodies.circle(centerX, centerY, 25, {
      isStatic: true,
      render: { fillStyle: 'rgba(255, 255, 255, 0.3)' }
    })
    Matter.Composite.add(world, centralBody)

    // Create orbital rings with larger, more visible objects
    const numRings = 3
    const objectsPerRing = [6, 10, 14]
    const ringRadii = [80, 130, 180]
    
    for (let ring = 0; ring < numRings; ring++) {
      const radius = ringRadii[ring]
      const objectCount = objectsPerRing[ring]
      
      for (let i = 0; i < objectCount; i++) {
        const angle = (i / objectCount) * Math.PI * 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        const shape = createShape(x, y, structure as any)
        
        // Make objects much larger and more visible
        Matter.Body.scale(shape, 1.8 + ring * 0.3, 1.8 + ring * 0.3)
        
        // Enhance visibility
        shape.render.fillStyle = `rgba(255, 255, 255, ${0.15 + ring * 0.05})`
        
        // Calculate proper orbital velocity using physics
        const orbitalSpeed = Math.sqrt(300 / radius) // Simplified orbital mechanics
        const velocityX = -Math.sin(angle) * orbitalSpeed
        const velocityY = Math.cos(angle) * orbitalSpeed
        
        Matter.Body.setVelocity(shape, { x: velocityX, y: velocityY })
        
        // Minimal friction for smooth orbits
        shape.friction = 0.001
        shape.frictionAir = 0.002
        shape.frictionStatic = 0.001
        
        Matter.Composite.add(world, shape)
      }
    }

    // Add fewer but larger chaotic objects
    for (let i = 0; i < 4; i++) {
      const side = Math.random() < 0.5 ? -30 : width + 30
      const x = side
      const y = Math.random() * height
      const shape = createShape(x, y, structure as any)
      
      // Make chaotic objects larger too
      Matter.Body.scale(shape, 2.2, 2.2)
      shape.render.fillStyle = 'rgba(255, 255, 255, 0.2)'
      
      // Give them velocity toward center
      const velocityX = (centerX - x) * 0.01
      const velocityY = (centerY - y) * 0.005 + (Math.random() - 0.5) * 2
      
      Matter.Body.setVelocity(shape, { x: velocityX, y: velocityY })
      shape.friction = 0.001
      shape.frictionAir = 0.001
      
      Matter.Composite.add(world, shape)
    }

    // Enhanced mouse control with stronger interaction
    const mouseConstraint = createMouseConstraint(engine, render)
    mouseConstraint.constraint.stiffness = 0.8
    mouseConstraint.constraint.damping = 0.1
    Matter.Composite.add(world, mouseConstraint)

    // Much stronger gravitational force to maintain stable orbits
    Matter.Events.on(engine, 'beforeUpdate', () => {
      const allBodies = Matter.Composite.allBodies(world)
      
      allBodies.forEach(body => {
        if (!body.isStatic) {
          const dx = centerX - body.position.x
          const dy = centerY - body.position.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 30) { // Don't affect central body
            // Much stronger gravitational force
            const force = 0.0008 * (body.mass / Math.max(distance * distance, 1000))
            const forceX = (dx / distance) * force
            const forceY = (dy / distance) * force
            
            Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY })
          }
        }
      })
    })
  },

  cleanup: () => {
    // No intervals to clean up for screenshot-optimized version
  }
}