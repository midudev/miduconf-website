import { DonDominio } from './don-dominio'
import { LemonCode } from './lemon-code'
import { Platzi } from './platzi'
import { Twitch } from './twitch'

export const Stickers = {
	Glasses: ({ className }) => <img className={className} src='/stickers/glasses.png' alt='' />,
	MiduWink: ({ className }) => <img className={className} src='/stickers/midu-wink.png' alt='' />,
	MiduBoss: ({ className }) => <img className={className} src='/stickers/midu-boss.png' alt='' />,
	MiduHype: ({ className }) => <img className={className} src='/stickers/midu-hype.png' alt='' />,
	MiduWtf: ({ className }) => <img className={className} src='/stickers/midu-wtf.png' alt='' />,
	MiduF: ({ className }) => <img className={className} src='/stickers/midu-f.png' alt='' />,
	MiduNotLikeThis: ({ className }) => (
		<img className={className} src='/stickers/midu-not-like-this.png' alt='' />
	),
	MiduAngry: ({ className }) => <img className={className} src='/stickers/midu-angry.png' alt='' />,
	MiduLul: ({ className }) => <img className={className} src='/stickers/midu-lul.png' alt='' />,
	MiduSnif: ({ className }) => <img className={className} src='/stickers/midu-snif.png' alt='' />,
	MiduWow: ({ className }) => <img className={className} src='/stickers/midu-wow.png' alt='' />,
	MiduLove: ({ className }) => <img className={className} src='/stickers/midu-love.png' alt='' />,
	Twitch,
	Platzi,
	LemonCode,
	DonDominio,
	ThisIsFine: ({ className }) => (
		<img className={className} src='/stickers/this-is-fine-normal.png' alt='' />
	),
	Start: ({ className }) => <img className={className} src='/stickers/start.png' alt='' />,
	Midu: ({ className }) => <img className={className} src='/stickers/midu.png' alt='' />,
	KeepCoding: ({ className }) => (
		<img className={className} src='/stickers/keep-coding.png' alt='' />
	),
	Cloudinary: ({ className }) => (
		<img className={className} src='/stickers/cloudinary.png' alt='' />
	),
	Mario: ({ className }) => <img className={className} src='/stickers/mario.png' alt='' />,
	LibroGit: ({ className }) => <img className={className} src='/stickers/libro-git.png' alt='' />,
	Vercel: ({ className }) => <img className={className} src='/stickers/vercel.png' alt='' />,
	Malt: ({ className }) => <img className={className} src='/stickers/malt.svg' />
}
