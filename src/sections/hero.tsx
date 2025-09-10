import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useSupabaseSignInByGitHub } from "@/auth/hooks/use-supabase-signin-by-github";
import { Background3D } from "@/components/Background3D";
import { CallToAction } from "@/components/CallToAction";
import { ConferenceDate } from "@/components/ConferenceDate";
import { Countdown } from "@/components/Countdown";
import { MiduLogo3D } from "@/components/experience/MiduLogo3D";
import { EnterArrow } from "@/components/icons/enter-arrow";
import { CONFERENCE_CONFIG } from "@/config/conference";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import { useRemainingTime } from "@/hooks/useRemainingTime";

interface Props {
	userData?: User;
	isLive?: boolean;
}

export function Hero({ userData, isLive = false }: Props) {
	const { signin } = useSupabaseSignInByGitHub();
	const isMounted = useMounted();
	const matches = useMediaQuery("(max-width: 768px)");
	const { countdownEnded } = useRemainingTime(
		new Date(CONFERENCE_CONFIG.EVENT_DATE),
		{ fillingZeros: false },
	);

	// Mostrar Hero live cuando el countdown llegue a 0 Y Midu esté en directo
	const showLiveHero = countdownEnded && isLive;

	// Si está en directo y el countdown terminó, mostrar Hero live
	if (showLiveHero) {
		const { hostname } =
			typeof window !== "undefined"
				? window.location
				: { hostname: "localhost" };

		return (
			<section
				className="relative h-[100dvh]"
				role="banner"
				aria-labelledby="hero-title"
			>
				{/* Background estático como en mobile */}
				<div className="absolute inset-0">
					<img
						src="/global/hero.avif"
						alt="Logo del evento de MiduConf 2025"
						width="10008"
						height="1512"
						className="object-cover h-full opacity-40"
					/>
				</div>

				{/* Layout centrado como en el wireframe */}
				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 space-y-8 pt-20">
					{/* Badge con dos secciones: Estamos en vivo | Ver en twitch */}
					<div className="flex items-center overflow-hidden rounded-full bg-black/80 border border-white/20">
						<div className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium">
							<div className="w-2 h-2 bg-white rounded-full animate-ping" />
							Estamos en vivo
						</div>
						<div className="px-4 py-2 text-white font-medium">
							<Link
								href="https://www.twitch.tv/midudev"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-palette-primary transition-colors"
							>
								Ver en twitch
							</Link>
						</div>
					</div>

					{/* Hero text grande y centrado */}
					<h1
						id="hero-title"
						className="text-center text-4xl-semibold text-balance max-w-4xl"
					>
						Consigue tu ticket para participar en los sorteos
					</h1>

					{/* CTA Button centrado */}
					{userData ? (
						<div className="flex items-center gap-4">
							{userData?.user_metadata.avatar_url && (
								<img
									className="object-cover w-10 h-10 rounded-[5px] aspect-square"
									width="40"
									height="40"
									src={userData.user_metadata.avatar_url}
									alt={`Avatar de ${
										userData.user_metadata.name ??
										userData.user_metadata.full_name ??
										"tu usuario"
									}`}
								/>
							)}
							<CallToAction
								IconComponent={EnterArrow}
								estilo="default"
								text="Ver tu Ticket"
								href={`/ticket/${userData.user_metadata.user_name}`}
							/>
						</div>
					) : (
						<CallToAction
							onClick={signin}
							text="Consigue tu ticket"
							estilo="default"
							IconComponent={EnterArrow}
						/>
					)}

					{/* Iframe de Twitch grande y centrado */}
					<div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
						<iframe
							src={`https://player.twitch.tv/?channel=midudev&parent=${hostname}&muted=false`}
							frameBorder="0"
							width="100%"
							height="100%"
							allowFullScreen={true}
							scrolling="no"
						/>
					</div>
				</div>
			</section>
		);
	}

	// Hero normal cuando no está en directo o el countdown no ha terminado
	return (
		<section
			className="relative h-[100dvh]"
			role="banner"
			aria-labelledby="hero-title"
		>
			<div className="absolute inset-0">
				{!isMounted ? (
					<div className="w-full h-full bg-palette-background" />
				) : matches ? (
					<img
						src="/global/hero.avif"
						alt="Logo del evento de MiduConf 2025"
						width="10008"
						height="1512"
						className="object-cover h-full animate-fade-in"
					/>
				) : (
					<>
						<MiduLogo3D />
						<Background3D />
					</>
				)}
			</div>

			<div className="absolute bottom-0 z-10 space-y-spacing-40 lg:grid lg:grid-cols-2 xl:grid-cols-[726px_550px] items-end justify-between w-full px-5 pb-5 md:bg-none animate-fade-in-up md:bottom-0 md:left-0">
				<div className="flex flex-col items-center mx-auto lg:ml-0 lg:items-start gap-spacing-24">
					<ConferenceDate className="" />
					<h1
						id="hero-title"
						className="text-center lg:text-left text-4xl-semibold text-balance"
					>
						<span className="block">La nueva era de</span>
						<span className="block">la programación</span>
					</h1>
				</div>
				<div className="flex flex-col gap-spacing-24">
					<Countdown className="self-end" />
					<p className="text-center lg:text-right text-xl-medium text-pretty">
						Conferencia de Programación y Desarrollo en Español en{" "}
						<Link
							href="https://www.twitch.tv/midudev"
							className="underline text-palette-primary focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2 focus:ring-offset-black"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visitar el canal de Twitch de midudev (se abre en nueva ventana)"
						>
							Twitch
						</Link>
					</p>

					{userData ? (
						<div className="flex flex-wrap items-center mx-auto gap-spacing-16 lg:mr-0">
							{userData?.user_metadata.avatar_url && (
								<img
									className="object-cover w-10 h-10 rounded-[5px] aspect-square"
									width="60"
									height="60"
									src={userData.user_metadata.avatar_url}
									alt={`Avatar de ${
										userData.user_metadata.name ??
										userData.user_metadata.full_name ??
										"tu usuario"
									}`}
								/>
							)}
							<CallToAction
								className="hidden: md:block"
								IconComponent={EnterArrow}
								estilo="default"
								text="Ver tu Ticket"
								href="/ticket"
							/>
						</div>
					) : (
						<>
							<CallToAction
								onClick={signin}
								className="mx-auto lg:mr-0 hero-ticket"
								text="Obtener ticket"
								estilo="default"
								IconComponent={EnterArrow}
							/>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
