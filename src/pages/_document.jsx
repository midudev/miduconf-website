import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es-ES'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#09090E' />
        <link
          rel='preconnect'
          href='https://ljizvfycxyxnupniyyxb.supabase.co'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='//ljizvfycxyxnupniyyxb.supabase.co' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
