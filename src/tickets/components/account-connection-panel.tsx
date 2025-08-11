import { Button } from '@/components/Button'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { getTwitchAuthorizeUrl } from '@/twitch/utils/get-twitch-authorize-url'
import { cn } from '@/lib/utils'

interface Props {
	twitchTier: '1' | '2' | '3' | null
	midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
	midudevTokentId: string
	username: string
}

export const AccountConnectionPanel = ({
	twitchTier,
	midudevTypeSub,
	midudevTokentId,
	username
}: Props) => {

	return (
		<div className='flex flex-col gap-4 mb-6'>
			<h4 className='text-sm font-medium tracking-wide uppercase text-palette-ghost'>
				Vincula tu cuenta
			</h4>
			<div className='flex gap-3'>
				{/* Academia Connection Button */}
				{midudevTypeSub ? (
					<Button
						variant='default'
						size='small'
						className='px-3 py-2 text-xs font-medium tracking-wide text-white uppercase bg-palette-primary hover:bg-palette-primary/80'
						disabled={true}
					>
						<div className='flex items-center justify-center gap-2'>
							<WhiteMidudevLogo className='size-5' />
							ACADEMIA
						</div>
					</Button>
				) : (
					<Button
						variant='default'
						size='small'
						href={`https://midu.dev/miduconf/ticket/${midudevTokentId}`}
						target='_blank'
						rel='noopener noreferrer'
						className='px-3 py-2 text-xs font-medium tracking-wide'
						as='a'
					>
						<div className='flex items-center justify-center gap-2 text-xs uppercase'>
							<WhiteMidudevLogo className='size-5' />
							Academia
						</div>
					</Button>
				)}

				{/* Twitch Connection Button */}
				{twitchTier ? (
					<div className='flex gap-2'>
						<Button
							variant='ghost'
							size='small'
							className='px-3 py-2 text-xs font-medium tracking-wide text-white uppercase bg-purple-600 border border-purple-600 hover:bg-purple-700'
							disabled={true}
						>
							<div className='flex items-center justify-center gap-2'>
								<svg
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='text-white'
								>
									<path d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z' />
								</svg>
								TWITCH TIER {twitchTier}
							</div>
						</Button>
						{/* Reconnect Button */}
						<Button
							variant='ghost'
							size='small'
							className='px-3 py-2 text-xs bg-purple-600 border border-purple-600 hover:bg-purple-700 transition-all duration-200 flex items-center justify-center'
							containerClassName='w-auto h-auto'
							href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: null })}
							target='_blank'
							rel='noopener noreferrer'
							as='a'
							title='Reconectar para actualizar tier de Twitch'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='text-white'
							>
								<path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
								<path d='M21 3v5h-5' />
								<path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
								<path d='M3 21v-5h5' />
							</svg>
						</Button>
					</div>
				) : (
					<Button
						variant='ghost'
						size='small'
						className='px-3 py-2 text-xs font-medium tracking-wide text-white uppercase bg-purple-600 border border-purple-600 hover:bg-purple-700'
						href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
						target='_blank'
						rel='noopener noreferrer'
						as='a'
					>
						<div className='flex items-center justify-center gap-2'>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='text-white'
							>
								<path d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z' />
							</svg>
							TWITCH
						</div>
					</Button>
				)}
			</div>
		</div>
	)
}