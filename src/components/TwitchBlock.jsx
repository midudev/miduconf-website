import { interTight } from '../pages'
import { TwitchLogo } from './TwitchLogo'

export function TwitchBlock () {
	return (
		<div className='relative flex flex-col items-center justify-center'>
			<a
				className='flex flex-col items-center justify-center w-full h-full transition hover:scale-125 group gap-y-10'
				target='_blank'
				href='https://twitch.tv/midudev'
			>
				<img
					alt='Avatar de Twitch del canal de midudev'
					className='absolute top-0 z-10 w-24 h-24 transition scale-0 rounded-full group-hover:scale-100'
					src='https://static-cdn.jtvnw.net/jtv_user_pictures/5a72c3d9-424a-40a6-bf23-73370cd85578-profile_image-150x150.png'
				/>
				<TwitchLogo
					className={
						'text-white transition w-32 group-hover:-rotate-6 group-hover:translate-y-4 group-hover:scale-[300%] group-hover:opacity-20'
					}
				/>
				<span
					className={`${interTight.className} font-bold inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent`}
				>
          twitch.tv/midudev
				</span>
			</a>
		</div>
	)
}
