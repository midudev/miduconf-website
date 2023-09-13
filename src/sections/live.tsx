import { useState, useEffect } from 'react'
import Script from 'next/script'

export function Live() {
	const [isTwitchLoaded, setIsTwitchLoaded] = useState(false)

	useEffect(() => {
		if (isTwitchLoaded || typeof Twitch !== 'undefined') {
			new Twitch.Embed('twitch-embed', {
				width: 854,
				height: 480,
				channel: 'midudev'
			})
		}
	}, [isTwitchLoaded])

	return (
		<>
			<section>
				<h2 className='text-6xl font-bold text-center text-white'>¡Estamos en directo!</h2>
				<p className='text-xl text-sky-200 text-center [text-wrap:balance] mt-4'>
					¡Únete a nuestra conferencia de desarrollo en Twitch!
				</p>
				<div id='twitch-embed' className='mt-16 [&>*]:m-auto'></div>
			</section>

			<Script
				src='https://embed.twitch.tv/embed/v1.js'
				strategy='lazyOnload'
				onLoad={() => {
					setIsTwitchLoaded(true)
				}}
			/>
		</>
	)
}
