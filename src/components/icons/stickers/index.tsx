import { DonDominio } from './don-dominio'
import { LemonCode } from './lemon-code'
import { Platzi } from './platzi'
import { Twitch } from './twitch'

export const Stickers = {
	Twitch,
	Platzi,
	LemonCode,
	DonDominio,
	Yeah: ({ className }) => <img className={className} src='/stickers/yeah.png' alt='' />,
	ThisIsFine: ({ className }) => (
		<img className={className} src='/stickers/this-is-fine.png' alt='' />
	),
	Start: ({ className }) => <img className={className} src='/stickers/start.png' alt='' />,
	Midu: ({ className }) => <img className={className} src='/stickers/midu.png' alt='' />,
	KeepCoding: ({ className }) => (
		<img className={className} src='/stickers/keep-coding.png' alt='' />
	)
}
