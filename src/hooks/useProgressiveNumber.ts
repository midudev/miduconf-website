import { useCallback, useEffect, useState } from 'preact/hooks'

export const useProgressiveNumber = (
	initialValue: number | (() => number),
	duration = 750,
	delay = 25
): [number, (value: number | ((prevTarget: number) => number)) => void] => {
	const [target, setTarget] = useState(initialValue)
	const [current, setCurrent] = useState(initialValue)
	const [step, setStep] = useState(0)

	const setValue = useCallback(
		(value: number | ((prevTarget: number) => number)) => {
			setCurrent((prevCurrent) => {
				const nextTarget = typeof value === 'function' ? value(target) : value
				const diff = Math.abs(prevCurrent - nextTarget)
				const steps = Math.max(duration / delay, 1)
				const nextStep = diff / steps

				setStep(nextStep)
				setTarget(nextTarget)

				return prevCurrent + (prevCurrent < nextTarget ? nextStep : -nextStep)
			})
		},
		[delay, duration, target]
	)

	useEffect(() => {
		const interval = setInterval(
			() =>
				setCurrent((prevCurrent) => {
					if (Math.abs(target - prevCurrent) < step) {
						clearInterval(interval)
						return target
					}
					return prevCurrent + (prevCurrent < target ? step : -step)
				}),
			delay
		)

		return () => clearInterval(interval)
	}, [delay, step, target])

	return [current, setValue]
}
