import { useSupabaseSignInByGitHub } from "@/auth/hooks/use-supabase-signin-by-github";
import { Button } from "@/components/Button";
import { EnterArrow } from "@/components/icons/enter-arrow";
import type { User } from "@supabase/supabase-js";

interface Props {
	userData?: User;
	isLive?: boolean;
}

export function Hero({
	userData,
}: Props) {
	const { signin } = useSupabaseSignInByGitHub();

	return (
		<section
			className="relative h-[100dvh]"
			role="banner"
			aria-labelledby="hero-title"
		>
			<div className="absolute inset-0">
				<img
					src="/global/hero.avif"
					alt="Logo del evento de MiduConf 2025"
					width="10008"
					height="1512"
					className="object-cover h-full opacity-40"
				/>
			</div>

			<div className="flex absolute inset-0 z-10 flex-col justify-center items-center px-5 pt-20 space-y-8">
				<div className="flex flex-col rounded-md border md:overflow-hidden md:items-center md:rounded-full md:flex-row bg-black/80 border-white/20">
					<div className="flex gap-2 items-center px-4 py-2 font-medium text-white bg-green-600 rounded-t-md md:rounded-none">
						<div className="w-2 h-2 bg-white rounded-full" />
						Evento finalizado
					</div>
					<div className="px-4 py-2 font-medium text-white">
						¡Gracias por participar!
					</div>
				</div>

				<div className="space-y-8 max-w-4xl text-center">
					<h1
						className="text-4xl-semibold text-balance"
					>
						¡Gracias por ser parte de MiduConf 2025!
					</h1>
					<p className="text-xl text-white/80 text-balance">
						Fue increíble compartir esta experiencia contigo
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 w-full max-w-2xl sm:grid-cols-2">
					<div className="p-6 text-center rounded-xl border backdrop-blur-sm bg-black/60 border-white/10">
						<div className="mb-2 text-3xl font-bold text-palette-primary">+10K</div>
						<div className="text-white/80">Viewers permanentes durante el directo</div>
					</div>
					<div className="p-6 text-center rounded-xl border backdrop-blur-sm bg-black/60 border-white/10">
						<div className="mb-2 text-3xl font-bold text-palette-primary">+8,500</div>
						<div className="text-white/80">Tickets generados</div>
					</div>
					<div className="col-span-full w-full max-w-3xl">
						<a
							href="https://www.youtube.com/watch?v=e1PqYpfkk7o&list=PLUofhDIg_38oMcKEB_zA9GY-Ldke8hIOy"
							target="_blank"
							rel="noopener noreferrer"
							className="flex gap-4 justify-center items-center px-6 py-4 text-lg font-medium text-white rounded-xl border backdrop-blur transition-colors border-red-600/60 bg-red-600/40 hover:bg-red-700/80 group"
						>
							<svg className="flex-shrink-0 w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
							</svg>
							<span className="text-center">Ver todas las charlas del evento</span>
							<svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>

				{userData ? (
					<div className="flex gap-4 items-center">
						{userData?.user_metadata.avatar_url && (
							<img
								className="object-cover size-14 rounded-[5px] aspect-square"
								width="40"
								height="40"
								src={userData.user_metadata.avatar_url}
								alt={`Avatar de ${userData.user_metadata.name ??
									userData.user_metadata.full_name ??
									"tu usuario"
									}`}
							/>
						)}
						<Button
							as="a"
							href={`/ticket/${userData.user_metadata.user_name}`}
							className="px-4 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl gap-x-2 !flex-row !items-center"
						>
							<EnterArrow className="w-auto h-4 sm:h-5" />
							<span className="hidden sm:inline">VER TU TICKET</span>
							<span className="sm:hidden">TICKET</span>
						</Button>
					</div>
				) : (
					<div className="space-y-4 text-center">
						<p className="text-white/60">¿Participaste en el evento?</p>
						<Button
							onClick={signin}
							className="px-4 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl gap-x-2 !flex-row !items-center"
						>
							<EnterArrow className="w-auto h-4 sm:h-5" />
							<span className="hidden sm:inline">VER TU TICKET</span>
							<span className="sm:hidden">VER TICKET</span>
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
