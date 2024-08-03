export const Background = () => (
	<>
		<div className='pointer-events-none absolute inset-0 h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]'></div>
		<svg
			aria-hidden='true'
			className='pointer-events-none w-full absolute inset-0 fill-black/[.06] stroke-black/[.06] dark:fill-white/[.06] dark:stroke-white/[.06] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] inset-x-0 -top-[1rem] -z-50 h-[80%] skew-y-12'
		>
			<defs>
				<pattern id=':S1:' width='80' height='80' patternUnits='userSpaceOnUse' x='-1' y='-1'>
					<path d='M.5 80V.5H80' fill='none' strokeDasharray='0'></path>
				</pattern>
			</defs>
			<rect width='100%' height='100%' strokeWidth='0' fill='url(#:S1:)'></rect>
		</svg>
	</>
)
