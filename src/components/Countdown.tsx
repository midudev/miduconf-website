import { useRemainingTime } from '@hooks/useRemainingTime'

type CountdownProps = {
	targetDate: Date
}

export const Countdown = ({ targetDate }: CountdownProps) => {
	const { days, hours, minutes, seconds, countdownEnded } = useRemainingTime(targetDate)
	const time = [
		{ label: 'Días', value: days },
		{ label: 'Horas', value: hours },
		{ label: 'Minutos', value: minutes },
		{ label: 'Segundos', value: seconds }
	]

	return (
		<>
			<div class='mb-2 mt-10 font-bold opacity-70'>
				{!countdownEnded ? 'Volvemos en...' : 'Empieza la #miduConf 🎊'}
			</div>
			<section class='flex'>
				{time.map(({ label, value }) => (
					<div class='flex-col w-24 md:w-32'>
						<div class='text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 '>
							{value}
						</div>
						<span class='text-black text-xl uppercase font-bold'>{label}</span>
					</div>
				))}
			</section>
		</>
	)
}
