import { EnterArrow } from '@/components/icons/enter-arrow'

export function GetTicket() {
	return (
		<section className='relative h-[800px] bg-pallet-b-foreground-primary flex items-center justify-center mt-44 overflow-hidden'>
			<h1 className='sr-only'>Obtener ticket</h1>
			<button
				disabled
				aria-disabled
				className='inline-flex flex-col items-center px-4 py-2.5 md:px-40 md:py-20 text-xl md:text-4xl text-white uppercase rounded-md mix-blend-screen gap-x-4 bg-pallet-primary disabled:cursor-not-allowed md:flex-row md:w-max'
			>
				<EnterArrow className='hidden w-auto h-10 md:block' />
				Consigue tu Ticket
				<span className='w-full px-4 py-2 text-sm bg-black/40 md:w-auto'>Próximamente</span>
			</button>
		</section>
	)
}

/* export default function ParticleBackground() {
	const sceneRef = useRef<HTMLDivElement>(null)
	const particlesRef = useRef<Matter.Body[]>([])
	const isHoveringRef = useRef(false)

	useEffect(() => {
		const engine = Matter.Engine.create()
		const render = Matter.Render.create({
			element: sceneRef.current!,
			engine,
			options: {
				width: window.innerWidth,
				height: 600,
				wireframes: false,
				background: 'transparent'
			}
		})

		const runner = Matter.Runner.create()
		Matter.Runner.run(runner, engine)
		Matter.Render.run(render)

		const { Bodies, Composite, Vector, Body } = Matter

		// Crear partículas
		for (let i = 0; i < 200; i++) {
			const particle = Bodies.rectangle(
				Math.random() * window.innerWidth,
				Math.random() * 600,
				40,
				40,
				{
					render: { fillStyle: '#5c81ea' },
					friction: 0.05,
					restitution: 0.9
				}
			)
			particlesRef.current.push(particle)
			Composite.add(engine.world, particle)
		}

		// Suelo invisible
		const ground = Bodies.rectangle(window.innerWidth / 2, 600 + 50, window.innerWidth, 100, {
			isStatic: true
		})
		Composite.add(engine.world, ground)

		// Handlers nombrados para poder removerlos luego
		const handleMouseEnter = () => {
			isHoveringRef.current = true
		}

		const handleMouseLeave = () => {
			isHoveringRef.current = false
		}

		const handleMouseMove = (event: MouseEvent) => {
			const hoveredElement = document.elementFromPoint(event.clientX, event.clientY)
			if (sceneRef.current && sceneRef.current.contains(hoveredElement)) {
				isHoveringRef.current = true
			} else {
				isHoveringRef.current = false
			}

			if (!isHoveringRef.current) return

			const mouse = { x: event.clientX, y: event.clientY }

			particlesRef.current.forEach((particle) => {
				const distance = Matter.Vector.magnitude(Matter.Vector.sub(particle.position, mouse))

				if (distance < 100) {
					const forceDirection = Matter.Vector.normalise(
						Matter.Vector.sub(particle.position, mouse)
					)
					const force = Matter.Vector.mult(forceDirection, 0.002)
					Matter.Body.applyForce(particle, particle.position, force)
				}
			})
		}

		// Eventos en el div contenedor
		const canvasElement = sceneRef.current
		canvasElement?.addEventListener('mouseenter', handleMouseEnter)
		canvasElement?.addEventListener('mouseleave', handleMouseLeave)
		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			canvasElement?.removeEventListener('mouseenter', handleMouseEnter)
			canvasElement?.removeEventListener('mouseleave', handleMouseLeave)
			window.removeEventListener('mousemove', handleMouseMove)
			Matter.Render.stop(render)
			Matter.Runner.stop(runner)
			Matter.World.clear(engine.world, false)
			Matter.Engine.clear(engine)
			render.canvas.remove()
		}
	}, [])

	return (
		<div
			ref={sceneRef}
			style={{
				position: 'absolute',
				inset: 0,
				zIndex: 50,
				pointerEvents: 'none'
			}}
		/>
	)
} */
