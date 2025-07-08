'use client'

interface Props {
	isOpen?: boolean
	onClose: () => void
	children: React.ReactNode
}

export function Modal({ isOpen = false, onClose, children }: Props) {
	if (!isOpen) return null

	return (
		<>
			<div className='absolute inset-0 w-dvw h-dvh backdrop-blur-sm bg-black/20 z-[9999999] animate-blurred-fade-in'></div>
			<dialog
				open={isOpen}
				className='max-w-[480px] w-full fixed inset-0 z-[9999999] px-5 py-5 animate-fade-in-up bg-[#121226] border border-pallet-primary rounded-3xl shadow-2xl shadow-pallet-primary/20'
			>
				<button
					onClick={onClose}
					title='Cerrar modal'
					aria-label='Cerrar modal'
					className='absolute p-3 transition-transform rounded-full bg-pallet-primary/10 top-5 right-5 hover:scale-110'
				>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						className='w-4 h-4'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M16.5 1.5L1.5 16.5'
							stroke='white'
							strokeWidth='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M1.5 1.5L16.5 16.5'
							stroke='white'
							strokeWidth='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</button>
				{children}
			</dialog>
		</>
	)
}
