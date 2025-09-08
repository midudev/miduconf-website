import { useEffect, useState } from "react";
import { DiamondIcon } from "@/components/icons/diamond";
import { DotIcon } from "@/components/icons/dot";
import { Title } from "@/components/Title";
import { cn } from "@/lib/utils";

export const Agenda = () => {
	const timezone = useGetTimezone();
	const [currentIndexHovered, setCurrentIndexHovered] = useState(0);

	const handleChangeImage = (index: number) => {
		setCurrentIndexHovered(index);
	};

	return (
		<section id="agenda" className="pt-16">
			<div className="px-5 flex flex-col gap-6 items-center md:items-start">
				<Title>Agenda</Title>
				<p className="text-xl text-white text-pretty max-w-[42ch] text-center md:text-left">
					Todas las charlas en directo y español
				</p>
				<p className="flex flex-col items-center px-4 py-2 uppercase border rounded-md md:flex-row text-palette-ghost w-max bg-palette-bg-foreground-primary border-palette-border-foreground gap-2">
					<span className="flex items-center">
						<DiamondIcon className="w-3 h-3 mr-3 text-palette-primary" />
						Hora zona local:
					</span>
					<span className="text-white">{timezone}</span>
				</p>
			</div>
			{LIST_OF_TALKS_NEW.length > 0 && (
				<div className="grid md:grid-cols-[1fr_auto] gap-8 mt-12 md:px-8 px-4">
					<article>
						<div className="hidden grid-cols-3 mb-3 text-xl uppercase md:grid text-palette-ghost opacity-75">
							<span>Hora</span>
							<span>Nombre</span>
							<span>Charla</span>
						</div>
						<ul>
							{LIST_OF_TALKS_NEW.map((props, i) => {
								return (
									<AgendaItem
										key={`${props.speaker?.name || "speaker"}-${i}`}
										{...props}
										disabledContent={props.disabledContent ?? false}
										index={i}
										onHover={handleChangeImage}
										isRaffle={props.isRaffle ?? false}
									/>
								);
							})}
						</ul>
					</article>
					<div className="relative items-start justify-center hidden md:flex">
						<img
							className="max-w-60 rounded-md w-full aspect-[9/12] object-cover sticky top-20"
							src={
								LIST_OF_TALKS_NEW[currentIndexHovered]?.speaker?.imgUrl || ""
							}
							alt={`Avatar del Speaker ${LIST_OF_TALKS_NEW[currentIndexHovered]?.title || ""}`}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

interface AgendaItemProps {
	speaker: {
		name: string;
		description: string;
		imgUrl: string;
	};
	title: string;
	startAt: number;
	durationInMinutes: number;
	onHover: (index: number) => void;
	index: number;
	disabledContent: boolean;
	isRaffle?: boolean;
}

const AgendaItem = ({
	startAt,
	durationInMinutes,
	title,
	speaker,
	onHover,
	index,
	disabledContent = false,
	isRaffle = false,
}: AgendaItemProps) => {
	const time = useTime({ timestamp: startAt, durationInMinutes });

	return (
		<li
			onMouseEnter={() => onHover(index)}
			className={cn(
				"flex flex-col gap-2 px-4 md:px-0 md:grid py-6 text-xl uppercase border-b text-palette-ghost border-palette-border-foreground min-h-32 relative cursor-crosshair overflow-hidden group",
				"before:w-full before:h-full before:absolute before:block before:bg-transparent before:-z-10 before:top-0 before:left-0 before:translate-y-full before:transition before:duration-300",
				"md:hover:before:translate-y-0 md:hover:text-white md:hover:before:bg-palette-primary",
				isRaffle 
					? "grid-cols-[200px_1fr] bg-yellow-950/20 border-yellow-500/30" 
					: "grid-cols-[200px_1fr_1fr]"
			)}
		>
			<p
				className={cn(
					"transition md:group-hover:translate-x-4 text-sm md:text-xl order-1 md:order-none flex items-center",
					disabledContent && "blur",
				)}
			>
				{time?.startAt} - {time?.endAt}
			</p>
			
			{isRaffle ? (
				<div
					className={cn(
						"text-lg md:text-3xl font-bold normal-case text-balance text-left order-2 md:order-none flex items-center gap-2",
						disabledContent && "blur",
					)}
				>
					<span className="text-yellow-100/80">{title}</span>
				</div>
			) : (
				<>
					<div
						className={cn(
							"text-sm md:text-xl font-medium order-2 md:order-none flex flex-col justify-center text-white/80",
							disabledContent && "blur",
						)}
					>
						<p>{speaker.name}</p>
						<p className="text-xs mt-2 md:text-sm font-normal opacity-75">{speaker.description}</p>
					</div>
					<p
						className={cn(
							"text-xl md:text-3xl font-semibold normal-case text-balance text-left order-3 md:order-none flex items-center text-white",
							disabledContent && "blur",
						)}
					>
						{title}
					</p>
				</>
			)}
		</li>
	);
};

type TimeHook = (props: {
	timestamp: number;
	durationInMinutes: number;
}) => null | {
	startAt: string;
	endAt: string;
};

const useTime: TimeHook = ({ timestamp, durationInMinutes }) => {
	const [time, setTime] = useState<{ startAt: string; endAt: string } | null>(
		null,
	);

	if (!timestamp) return null;

	useEffect(() => {
		// get HH:MM in the local user timezone
		const timeFormatConfig = {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		} as Intl.DateTimeFormatOptions;

		const durationInMs = durationInMinutes * 60 * 1000;

		const startAt = new Date(timestamp).toLocaleTimeString(
			[],
			timeFormatConfig,
		);
		const endAt = new Date(timestamp + durationInMs).toLocaleTimeString(
			[],
			timeFormatConfig,
		);

		// setTime(`${localTime} - ${endTime}`)
		setTime({
			startAt,
			endAt,
		});
	}, []);

	return time;
};

export const useGetTimezone = () => {
	const [timezone, setTimezone] = useState<string | null>(null);

	useEffect(() => {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		setTimezone(timezone);
	}, []);

	return timezone;
};

const LIST_OF_TALKS_NEW: Array<{
	speaker: {
		name: string;
		description: string;
		imgUrl: string;
	};
	title: string;
	startAt: number;
	durationInMinutes: number;
	disabledContent?: boolean;
	isRaffle?: boolean;
}> = [
	{
		speaker: {
			name: "miduConf",
			description: "Conferencia 2025",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "¡Empezamos!",
		startAt: 1757516400000, // 17:00H 10 Sept 2025
		durationInMinutes: 10,
	},
	{
		speaker: {
			name: "Miguel Ángel Durán",
			description: "Creador de contenido y divulgador",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Próximos cursos y contenidos por midudev",
		startAt: 1757517000000, // 17:10H
		durationInMinutes: 20,
	},
	{
		speaker: {
			name: "Sorteo Sony",
			description: "Sorteo Alfombrillas DonDominio x midudev",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de Alfombrillas DonDominio x midudev",
		startAt: 1757518200000, // 17:30H
		durationInMinutes: 5,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Chema Alonso",
			description: "VP Head of International Development en Cloudflare",
			imgUrl: "/speakers/chema-alonso.webp",
		},
		title: "Ciberseguridad y su rol en Cloudflare",
		startAt: 1757518800000, // 17:40H
		durationInMinutes: 20,
	},
	{
		speaker: {
			name: "Sorteo Keychron",
			description: "Sorteo de teclado Keychron",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de teclado Keychron",
		startAt: 1757520000000, // 18:00H
		durationInMinutes: 5,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Alba Silvente",
			description: "FullStack Developer",
			imgUrl: "/speakers/alba-silvente.webp",
		},
		title: "IA en el navegador",
		startAt: 1757520300000, // 18:05H
		durationInMinutes: 20,
	},
	{
		speaker: {
			name: "Sorteo Libros",
			description: "Sorteo de 3 libros de Git + GitHub",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de 3 libros de Git + GitHub",
		startAt: 1757521500000, // 18:25H
		durationInMinutes: 5,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Guillermo Rauch",
			description: "CEO de Vercel",
			imgUrl: "/speakers/guillermo-rauch.webp",
		},
		title: "Vercel, Next.js, el futuro de React, V0 y más",
		startAt: 1757521800000, // 18:30H
		durationInMinutes: 30,
	},
	{
		speaker: {
			name: "Sorteo Keychron",
			description: "Sorteo de teclado Keychron",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de teclado Keychron",
		startAt: 1757523600000, // 19:00H
		durationInMinutes: 25,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Mario Santiago",
			description: "InfoJobs",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Tips para Desarrollar tu Carrera Tech",
		startAt: 1757525100000, // 19:25H
		durationInMinutes: 5,
	},
	{
		speaker: {
			name: "dotCSV",
			description: "Divulgador de IA",
			imgUrl: "/speakers/dotcsv.webp",
		},
		title: "¿Qué nos espera en la IA?",
		startAt: 1757525400000, // 19:30H
		durationInMinutes: 25,
	},
	{
		speaker: {
			name: "Sorteo cascos Sony con Malt",
			description: "Sorteo cascos Sony con Malt",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo cascos Sony Sony WF-1000XM5 con Malt",
		startAt: 1757526900000, // 20:00H
		durationInMinutes: 10,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Darwinglish",
			description: "Darwinglish @ Inglés para Devs",
			imgUrl: "/speakers/darwinglish.webp",
		},
		title: "Inglés para Devs",
		startAt: 1757527500000, // 20:05H
		durationInMinutes: 20,
	},
	{
		speaker: {
			name: "Sorteo de MiniPC",
			description: "Sorteo de ordenador Geekom A5 2025 Edition",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de ordenador Geekom A5 2025 Edition",
		startAt: 1757528700000, // 20:25H
		durationInMinutes: 5,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Gisela Torres",
			description: "Senior Global Blackbelt @ Microsoft",
			imgUrl: "/speakers/gisela-torres.webp",
		},
		title: "Programando tus MCPs",
		startAt: 1757529000000, // 20:30H
		durationInMinutes: 25,
	},
	{
		speaker: {
			name: "Sorteo de LemonCode",
			description: "2 bootcamps de Programación",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de 2 Bootcamps de LemonCode. Valorados en 2500€ cada uno",
		startAt: 1757530500000, // 20:55H
		durationInMinutes: 5,
		isRaffle: true,
	},
	{
		speaker: {
			name: "Theo",
			description: "Content Creator & Developer",
			imgUrl: "/speakers/theo.webp",
		},
		title: "Charla con Theo",
		startAt: 1757530800000, // 21:00H
		durationInMinutes: 25,
	},
	{
		speaker: {
			name: "Sorteo de Mac Mini",
			description: "Sorteo de Mac Mini M4",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de Mac Mini M4",
		startAt: 1757532600000, // 21:30H
		durationInMinutes: 5,
		isRaffle: true,
	}
];
