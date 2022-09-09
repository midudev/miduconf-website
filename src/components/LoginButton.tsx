import type { FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { supabase, extractInfoFrom } from '../lib/supabase'
import { useUser } from 'src/hooks/useUser'

const ticketIcon = (
	<svg class='w-8 h-8' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'>
		<path
			fill='#FCEA2B'
			d='M48.713 23.515c-3.428-3.552-4.029-8.784-1.869-12.933l-3.6-3.732L6.886 41.936l3.801 3.94c4.073-1.574 8.868-.671 12.09 2.667 3.222 3.339 3.953 8.164 2.236 12.178l3.802 3.939 36.357-35.086-3.6-3.732c-4.225 2.011-9.431 1.225-12.86-2.327z'
		/>
		<path
			fill='none'
			stroke='#000'
			stroke-miterlimit='10'
			stroke-width='2'
			d='M48.155 23.505c-3.428-3.552-4.029-8.784-1.869-12.933l-3.6-3.732L6.328 41.926l3.801 3.94c4.072-1.574 8.868-.671 12.09 2.667s3.953 8.164 2.236 12.178l3.801 3.939 36.358-35.086-3.6-3.732c-4.225 2.011-9.431 1.225-12.86-2.327z'
		/>
		<circle cx='37.122' cy='22.122' transform='rotate(-44.781 37.124 22.123)' r='2' />
		<circle cx='43.612' cy='28.661' transform='rotate(-44.781 43.614 28.661)' r='2' />
		<circle cx='50.101' cy='35.199' transform='rotate(-44.781 50.104 35.2)' r='2' />
	</svg>
)

const logoutIcon = (
	<svg class='w-10 h-10' viewBox='0 0  24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'/></svg>
)

const Button: FunctionalComponent<{ onClick: () => void }> = ({ onClick, children }) => {
	return (
		<div class='relative inline-block'>
			<div class='w-full h-full bg-gray-900 ml-0.5 mt-0.5 rounded-lg absolute left-0 top-0'></div>
			<button
				class={
					'relative inline-flex gap-x-2 items-center px-5 py-2 text-2xl font-bold text-center no-underline whitespace-no-wrap align-middle transition-colors border-2 border-solid rounded-md shadow-xs cursor-pointer select-none hover:shadow-xs focus:shadow-xs text-gray-900 bg-white border-gray-900 hover:bg-yellow-100 hover:text-gray-900'
				}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	)
}

export function LogoutButton () {
	const user = useUser()
	const [hidden, setHidden] = useState(true)

	useEffect(() => {
		if (user) setHidden(false)
	}, [user])

	const logout = async () => {
		const { error } = await supabase.auth.signOut()
		window.location.href = '/'
		// TODO: Send this error to somewhere more useful!!! 🤣
		if (error) console.error(error)
	}

	return (
		<div class='absolute top-4 right-4'>
			<button id='logout-button' class={`${hidden ? 'hidden' : ''}`} onClick={logout}>
				{logoutIcon}
			</button>
		</div>
	)
}

export function LoginButton ({ redirect }) {
	const user = useUser()

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
			if (!redirect) return
			if (sessionStorage.getItem('redirect')) {
				const newUser = extractInfoFrom(session?.user)
				window.location.href = `/ticket/${newUser.userName}`
				sessionStorage.removeItem('redirect')
			}
		})

		return () => listener?.unsubscribe()
	}, [])

	const login = async () => {
		sessionStorage.setItem('redirect', 'true')

		const { error } = await supabase.auth.signIn(
			{
				provider: 'github'
			},
			{
				redirectTo: window.location.origin
			}
		)

		// TODO: Send this error to somewhere more useful!!! 🤣
		if (error) console.error(error)
	}

	if (user === undefined) return <div />

	if (user !== null) {
		return (
			<Button onClick={() => {
				window.location.href = `/ticket/${user.userName}`
			}}>
				{ticketIcon}
        ¡Ver mi ticket!
			</Button>
		)
	}

	return (
		<Button onClick={login}>
			{ticketIcon}
			¡Consigue tu ticket GRATIS!
		</Button>
	)
}
