import { useEffect, useState } from 'preact/hooks'

type RemainingDate<T> = {
	days: T
	hours: T
	minutes: T
	seconds: T
}

const mapValues = (object: { [key: string]: unknown }, iterator: Function) => {
	return Object.keys(object).reduce((acc, key) => {
		acc[key] = iterator(object[key])
		return acc
	}, {})
}

const getRemainingTime = (targetDate: Date) => {
	const currentDate = new Date()
	const diff = targetDate.getTime() - currentDate.getTime()
	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diff % (1000 * 60)) / 1000)
	return { days, hours, minutes, seconds }
}

const fillZeros = (remainingDate: RemainingDate<number>) => {
	return mapValues(remainingDate, (value) => `${value}`.padStart(2, '0')) as RemainingDate<string>
}

export const useRemainingTime = (targetDate: Date) => {
	const [remainingDate, setRemainingDate] = useState(getRemainingTime(targetDate))

	const { seconds, minutes, hours, days } = remainingDate
	const continueCountdown = days > 0 && hours > 0 && minutes > 0 && seconds > 0

	useEffect(() => {
		const timer =
			continueCountdown &&
			setInterval(() => {
				setRemainingDate(getRemainingTime(targetDate))
			}, 1000)
		return () => clearInterval(timer)
	}, [])

	return fillZeros(remainingDate)
}
