import { GeistMono as geistMono } from 'geist/font/mono'
import { Inter, IBM_Plex_Mono } from 'next/font/google'

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
