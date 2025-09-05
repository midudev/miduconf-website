import { Header } from '@/components/Header'
import { fonts } from '@/config/fonts'
import Head from 'next/head'

interface Props {
  children: React.ReactNode
  meta: {
    title: string
    description: string
    ogImage: string
    url: string
    robots?: string
    canonical?: string
  }
}

export function Layout({ children, meta: { title, description, ogImage, url, robots, canonical } }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:image' content={ogImage} />
        <meta property='twitter:image' content={ogImage} />
        <meta property='og:image:alt' content={title} />
        <meta name='twitter:image:alt' content={title} />
        <meta property='og:title' content={title} />
        <meta property='twitter:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:description' content={description} />
        <meta property='og:url' content={url} />
        <meta property='twitter:url' content={url} />
        <meta property='og:site_name' content='miduConf' />
        <meta property='og:locale' content='es_ES' />
        <meta property='og:type' content='website' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@midudev' />
        <meta name='twitter:creator' content='@midudev' />
        {robots && <meta name='robots' content={robots} />}
        <link rel='canonical' href={canonical ?? url} />
        <link rel='alternate' hrefLang='es' href={canonical ?? url} />
        <link rel='alternate' hrefLang='x-default' href={canonical ?? url} />
        <link rel='icon' type='image/png' href='/favicon.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <div className={fonts.ibmPlexMono.variable}>
        <Header />
        {children}
      </div>
    </>
  )
}
