import { Header } from '@/components/Header'
import Head from 'next/head'

interface Props {
	children: React.ReactNode
	meta: {
		title: string
		description: string
		ogImage: string
		url: string
	}
}

export function Layout({ children, meta: { title, description, ogImage, url } }: Props) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta property='og:image' content={ogImage} />
				<meta property='twitter:image' content={ogImage} />
				<meta property='og:title' content={title} />
				<meta property='twitter:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='twitter:description' content={description} />
				<meta property='og:url' content={url} />
				<meta property='twitter:url' content={url} />
				<meta property='og:type' content='website' />
				<meta property='twitter:card' content='summary_large_image' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<div className='bg-[url(/global/bg.png)] min-h-screen bg-cover bg-center image-pixelated'>
				<header className='fixed top-0 left-0 flex items-center justify-between w-full px-8 py-4'>
					<h1 className='flex items-center text-2xl font-extrabold text-white'>
						MIDU.<span className='text-midu-primary'>CONF</span>
						<span className='px-1 py-1 ml-1 text-xs leading-none border text-midu-primary border-midu-primary'>
							25
						</span>
					</h1>
				</header>
				{children}
			</div>
		</>
	)
}
