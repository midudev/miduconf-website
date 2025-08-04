'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import { getAnimation, AnimationType, StructureType, AnimationContext } from '../animations'
import { useAtroposSync } from '../context/AtroposSync'

interface Props {
	structure: StructureType
	animation: AnimationType
	className?: string
}

export const TicketPhysicsBackground = ({ structure, animation, className = '' }: Props) => {
	const sceneRef = useRef<HTMLDivElement>(null)
	const engineRef = useRef<Matter.Engine | null>(null)
	const renderRef = useRef<Matter.Render | null>(null)
	const runnerRef = useRef<Matter.Runner | null>(null)
	const currentAnimationRef = useRef<{ cleanup?: () => void } | null>(null)
	const baseGravityRef = useRef<{ x: number; y: number }>({ x: 0, y: 1 })
	
	// Try to get Atropos sync context, but don't fail if it's not available
	let setTiltHandler: ((handler: (x: number, y: number) => void) => void) | null = null
	try {
		const sync = useAtroposSync()
		setTiltHandler = sync.setTiltHandler
	} catch {
		// Context not available, that's okay
	}

	useEffect(() => {
		if (!sceneRef.current) return

		// Detect if mobile device for performance optimization
		const isMobile = window.innerWidth < 768 || 'ontouchstart' in window

		// Initialize Matter.js engine with optimized settings
		const engine = Matter.Engine.create()
		const world = engine.world
		engineRef.current = engine

		// Optimize engine for performance - more aggressive
		engine.timing.timeScale = isMobile ? 0.7 : 0.9 // Slower timing for stability
		engine.constraintIterations = isMobile ? 1 : 1 // Minimal constraint iterations
		engine.positionIterations = isMobile ? 2 : 3 // Minimal position iterations
		engine.velocityIterations = isMobile ? 2 : 3 // Minimal velocity iterations

		// Create renderer with performance optimizations
		const render = Matter.Render.create({
			element: sceneRef.current,
			engine: engine,
			options: {
				width: sceneRef.current.clientWidth,
				height: sceneRef.current.clientHeight,
				wireframes: false,
				background: 'transparent',
				showAngleIndicator: false,
				showVelocity: false,
				showDebug: false,
				showStats: false,
				showBroadphase: false,
				showBounds: false,
				showAxes: false,
				showPositions: false,
				pixelRatio: isMobile ? 0.8 : 1.2, // Lower pixel ratio for performance
				hasBounds: true // Enable bounds optimization
			}
		})

		// Style canvas for overlay effect
		render.canvas.style.pointerEvents = 'none'
		render.canvas.style.position = 'absolute'
		render.canvas.style.top = '0'
		render.canvas.style.left = '0'
		render.canvas.style.zIndex = '1'
		renderRef.current = render

		Matter.Render.run(render)

		// Create runner with optimized timing  
		const runner = Matter.Runner.create()
		runnerRef.current = runner
		Matter.Runner.run(runner, engine)

		// Get dimensions
		const width = sceneRef.current.clientWidth
		const height = sceneRef.current.clientHeight

		// Create animation context with mobile optimizations
		const context: AnimationContext = {
			engine,
			world,
			render,
			runner,
			config: {
				width,
				height,
				structure,
				physics: {
					gravity: isMobile ? 0.6 : 0.8, // Lower gravity for smoother animation
					restitution: isMobile ? 0.3 : 0.4, // Less bouncy for stability
					friction: isMobile ? 0.3 : 0.2 // More friction for stability
				},
				isMobile // Pass mobile flag to animations
			}
		}

		// Get and setup the animation module
		const animationModule = getAnimation(animation)
		currentAnimationRef.current = animationModule
		animationModule.setup(context)

		// Set up Atropos tilt handler for realistic gravity physics
		const handleTilt = (normalizedX: number, normalizedY: number) => {
			if (!engineRef.current) return
			
			// Realistic physics: when tilted right, gravity pulls right (objects fall right)
			const gravityStrength = isMobile ? 0.6 : 0.8 // Moderate gravity strength
			const tiltSensitivity = 1.2 // Moderate sensitivity for smooth movement
			
			// Map tilt to gravity direction (corrected physics mapping)
			// When mouse is RIGHT, objects should fall RIGHT (positive X gravity)
			// When mouse is LEFT, objects should fall LEFT (negative X gravity)  
			// When mouse is DOWN, objects should fall DOWN (positive Y gravity)
			// When mouse is UP, objects should fall UP (negative Y gravity)
			const gravityX = normalizedX * tiltSensitivity * gravityStrength // Direct mapping: right = positive
			const gravityY = baseGravityRef.current.y + (normalizedY * tiltSensitivity * gravityStrength * 0.3)
			
			// Apply smooth gravity transition (not instant)
			const currentGravityX = engineRef.current.gravity.x
			const currentGravityY = engineRef.current.gravity.y
			
			const smoothing = 0.15 // Smooth transition factor
			const newGravityX = currentGravityX + (gravityX - currentGravityX) * smoothing
			const newGravityY = currentGravityY + (gravityY - currentGravityY) * smoothing
			
			// Update engine gravity with smooth, realistic physics
			engineRef.current.gravity.x = newGravityX
			engineRef.current.gravity.y = Math.max(0.2, newGravityY) // Maintain minimum downward gravity
		}

		// Register the tilt handler if context is available
		if (setTiltHandler) {
			setTiltHandler(handleTilt)
		}

		// Cleanup function
		return () => {
			// Cleanup animation-specific resources
			if (currentAnimationRef.current?.cleanup) {
				currentAnimationRef.current.cleanup()
			}

			// Cleanup Matter.js resources
			if (renderRef.current) {
				Matter.Render.stop(renderRef.current)
			}
			if (runnerRef.current) {
				Matter.Runner.stop(runnerRef.current)
			}
			if (engineRef.current) {
				Matter.Engine.clear(engineRef.current)
			}
			if (render.canvas) {
				render.canvas.remove()
			}
		}
	}, [structure, animation])

	return (
		<div 
			ref={sceneRef} 
			className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
		/>
	)
}