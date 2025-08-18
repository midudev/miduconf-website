'use client'

import { Button } from '@/components/Button'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import { useSupabaseSignInByGitHub } from '@/auth/hooks/use-supabase-signin-by-github'

function ParticleBackground() {
	const sceneRef = useRef<HTMLDivElement>(null)
	const engineRef = useRef<Matter.Engine | null>(null)
	const renderRef = useRef<Matter.Render | null>(null)
	const runnerRef = useRef<Matter.Runner | null>(null)

	useEffect(() => {
		if (!sceneRef.current) return

		const Engine = Matter.Engine
		const Render = Matter.Render
		const Runner = Matter.Runner
		const Bodies = Matter.Bodies
		const Composite = Matter.Composite
		const Mouse = Matter.Mouse
		const MouseConstraint = Matter.MouseConstraint

		const engine = Engine.create()
		engineRef.current = engine

		const render = Render.create({
			element: sceneRef.current,
			engine: engine,
			options: {
				width: sceneRef.current.clientWidth,
				height: 800,
				wireframes: false,
				background: 'transparent',
				showAngleIndicator: false,
				showVelocity: false
			}
		})

		// Disable mouse constraint to prevent scroll hijacking
		render.canvas.style.pointerEvents = 'none'
		renderRef.current = render

		Render.run(render)

		const runner = Runner.create()
		runnerRef.current = runner
		Runner.run(runner, engine)

		const squares: Matter.Body[] = []
		const colors = ['#5c81ea', '#4f73d9', '#6b8bf0', '#3a5fcf']

		for (let i = 0; i < 100; i++) {
			const size = Math.random() * 20 + 15
			const square = Bodies.rectangle(
				Math.random() * sceneRef.current.clientWidth,
				Math.random() * -2000 - 100,
				size,
				size,
				{
					render: {
						fillStyle: colors[Math.floor(Math.random() * colors.length)]
					},
					restitution: 0.3,
					friction: 0.001,
					frictionAir: 0.01,
					angle: Math.random() * Math.PI * 2
				}
			)
			squares.push(square)
		}

		const ground = Bodies.rectangle(
			sceneRef.current.clientWidth / 2,
			850,
			sceneRef.current.clientWidth,
			100,
			{
				isStatic: true,
				render: { fillStyle: 'transparent' }
			}
		)

		const leftWall = Bodies.rectangle(-25, 400, 50, 800, {
			isStatic: true,
			render: { fillStyle: 'transparent' }
		})

		const rightWall = Bodies.rectangle(sceneRef.current.clientWidth + 25, 400, 50, 800, {
			isStatic: true,
			render: { fillStyle: 'transparent' }
		})

		const mouse = Mouse.create(render.canvas)
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.1,
				render: {
					visible: false
				}
			}
		})

		// Add custom mouse repulsion effect using window event
		const handleMouseMove = (event: MouseEvent) => {
			const rect = sceneRef.current?.getBoundingClientRect()
			if (!rect) return

			// Check if mouse is within the section bounds
			if (event.clientY < rect.top || event.clientY > rect.bottom) return

			const mousePos = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			}

			squares.forEach((square) => {
				const distance = Math.sqrt(
					Math.pow(square.position.x - mousePos.x, 2) + Math.pow(square.position.y - mousePos.y, 2)
				)

				if (distance < 150) {
					const forceMultiplier = (0.07 * (150 - distance)) / 150
					const angle = Math.atan2(square.position.y - mousePos.y, square.position.x - mousePos.x)

					const force = {
						x: Math.cos(angle) * forceMultiplier,
						y: Math.sin(angle) * forceMultiplier
					}

					Matter.Body.applyForce(square, square.position, force)
				}
			})
		}

		window.addEventListener('mousemove', handleMouseMove, { passive: true })

		Composite.add(engine.world, [...squares, ground, leftWall, rightWall])

		const addSquareInterval = setInterval(() => {
			if (squares.length < 150) {
				const size = Math.random() * 20 + 15
				const newSquare = Bodies.rectangle(
					Math.random() * sceneRef.current!.clientWidth,
					-50,
					size,
					size,
					{
						render: {
							fillStyle: colors[Math.floor(Math.random() * colors.length)]
						},
						restitution: 0.3,
						friction: 0.001,
						frictionAir: 0.01,
						angle: Math.random() * Math.PI * 2
					}
				)
				squares.push(newSquare)
				Composite.add(engine.world, newSquare)
			}
		}, 200)

		const cleanupInterval = setInterval(() => {
			const bodiesToRemove = squares.filter((square) => square.position.y > 1000)
			bodiesToRemove.forEach((body) => {
				Composite.remove(engine.world, body)
				const index = squares.indexOf(body)
				if (index > -1) squares.splice(index, 1)
			})
		}, 1000)

		render.mouse = mouse

		return () => {
			clearInterval(addSquareInterval)
			clearInterval(cleanupInterval)
			window.removeEventListener('mousemove', handleMouseMove)

			if (renderRef.current) {
				Render.stop(renderRef.current)
			}
			if (runnerRef.current) {
				Runner.stop(runnerRef.current)
			}
			if (engineRef.current) {
				Engine.clear(engineRef.current)
			}
			if (render.canvas) {
				render.canvas.remove()
			}
		}
	}, [])

	return (
		<div ref={sceneRef} className='absolute inset-0 pointer-events-none' style={{ zIndex: 1 }} />
	)
}

export function GetTicket() {
	const { signin } = useSupabaseSignInByGitHub()
	return (
		<section className='relative h-[800px] z-[10] bg-palette-bg-foreground-primary flex items-center justify-center mt-44 overflow-hidden'>
			<h1 className='sr-only'>Obtener ticket</h1>
			<ParticleBackground />
			<Button
				onClick={signin}
				className='px-4 py-2.5 md:px-40 md:py-20 text-xl md:text-6xl gap-x-4 duration-500'
			>
				<EnterArrow className='hidden w-auto h-10 md:block' />
				OBTENER TICKET
			</Button>
		</section>
	)
}
