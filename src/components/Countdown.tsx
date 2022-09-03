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
			<div class='mb-2 font-bold'>
				{!countdownEnded ? '¡Ya falta muy poco!' : 'Empieza la #miduConf 🎊'}
			</div>
			<section class='flex'>
				{time.map(({ label, value }) => (
					<div class='flex-col w-24'>
						<div class='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 '>
							{value}
						</div>
						<span class='text-blue-700'>{label}</span>
					</div>
				))}
			</section>
		</>
	)
}
