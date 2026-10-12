import localFont from 'next/font/local'
import { Inter, IBM_Plex_Mono } from 'next/font/google'

const geistMono = localFont({
  src: '../../public/fonts/GeistMono-Variable.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap'
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter'
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex'
})

export const fonts = {
  inter,
  geistMono,
  ibmPlexMono
}
