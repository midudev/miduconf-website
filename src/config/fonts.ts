import { GeistMono as geistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'

const inter = Inter({
	weight: ['400', '500', '600'],
	subsets: ['latin'],
	variable: '--font-inter'
})

export const fonts = {
	inter,
	geistMono
}
