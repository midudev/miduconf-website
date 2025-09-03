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
						<div className="hidden grid-cols-3 mb-3 text-xl uppercase md:grid text-palette-ghost">
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
			{LIST_OF_TALKS_NEW.length === 0 && (
				<>
					<div className="relative">
						<p className="text-4xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center gap-2 z-10">
							<DiamondIcon className="w-8 h-auto" />
							¡Muy pronto revelaremos la agenda!
							<DiamondIcon className="w-8 h-auto" />
						</p>

						<div
							aria-hidden
							className="grid relative md:grid-cols-[1fr_auto] gap-8 mt-20 md:px-8 px-4 select-none pointer-events-none [mask-image:linear-gradient(to_bottom,_#000,_transparent)]"
						>
							<article>
								<div className="hidden grid-cols-3 mb-3 text-xl uppercase md:grid text-palette-ghost">
									<span>Hora</span>
									<span>Nombre</span>
									<span>Charla</span>
								</div>
								<ul>
									{LIST_OF_FAKE_TALKS.map((props, i) => {
										return (
											<AgendaItem
												disabledContent
												key={`${props.speaker.name}-${i}`}
												{...props}
												index={i}
												onHover={handleChangeImage}
											/>
										);
									})}
								</ul>
							</article>
							<div className="relative items-start justify-center hidden md:flex">
								<img
									className="max-w-60 rounded-md w-full aspect-[9/12] object-cover sticky top-20 opacity-20"
									src={LIST_OF_FAKE_TALKS[currentIndexHovered].speaker.imgUrl}
									alt={`Avatar del Speaker ${LIST_OF_FAKE_TALKS[currentIndexHovered].title}`}
								/>
							</div>
						</div>
					</div>
				</>
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
}

const AgendaItem = ({
	startAt,
	durationInMinutes,
	title,
	speaker,
	onHover,
	index,
	disabledContent = false,
}: AgendaItemProps) => {
	const time = useTime({ timestamp: startAt, durationInMinutes });

	return (
		<li
			onMouseEnter={() => onHover(index)}
			className={cn(
				"flex flex-col gap-2 px-4 md:px-0 md:grid grid-cols-3 py-6 text-xl uppercase border-b text-palette-ghost border-palette-border-foreground min-h-32 relative cursor-crosshair overflow-hidden group",
				"before:w-full before:h-full before:absolute before:block before:bg-transparent before:-z-10 before:top-0 before:left-0 before:translate-y-full before:transition before:duration-300",
				"md:hover:before:translate-y-0 md:hover:text-white md:hover:before:bg-palette-primary",
			)}
		>
			<p
				className={cn(
					"transition md:group-hover:translate-x-4 text-sm md:text-xl order-1 md:order-none",
					disabledContent && "blur",
				)}
			>
				{time?.startAt} - {time?.endAt}
			</p>
			<p
				className={cn(
					"text-sm md:text-xl font-medium order-2 md:order-none",
					disabledContent && "blur",
				)}
			>
				{speaker.name}
			</p>
			<p
				className={cn(
					"text-xl md:text-3xl font-semibold normal-case text-balance text-left order-3 md:order-none",
					disabledContent && "blur",
				)}
			>
				{title}
			</p>
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

const LIST_OF_FAKE_TALKS = [
	{
		speaker: {
			name: "Noexisto",
			description: "Aqui no hay nadie",
			imgUrl: "/speakers/speaker-01.webp",
		},
		title: "que curioso, aquí no dice nada :)",
		startAt: 1726152000000,
		durationInMinutes: 20,
	},
	{
		speaker: {
			name: "Nadie poraqui",
			description: "Quien crees que soy",
			imgUrl: "/speakers/speaker-02.webp",
		},
		title: "¡Bienvenidos a la miduConf!",
		startAt: 1726153200000,
		durationInMinutes: 5,
	},
	{
		speaker: {
			name: "Nadie poralli",
			description: "Secreto",
			imgUrl: "/speakers/speaker-03.webp",
		},
		title: "Muy pronto lo revelaremos",
		startAt: 1726153500000,
		durationInMinutes: 10,
	},
];

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
		title: "Próximos cursos y contenidos por Miguel Ángel Durán",
		startAt: 1757517000000, // 17:10H
		durationInMinutes: 20,
	},
	{
		speaker: {
			name: "Sorteo Sony",
			description: "Sorteo de Cascos Sony",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de Cascos Sony",
		startAt: 1757518200000, // 17:30H
		durationInMinutes: 10,
	},
	{
		speaker: {
			name: "Chema Alonso",
			description: "VP Head of International Development en Cloudflare",
			imgUrl: "/speakers/chema-alonso.webp",
		},
		title: "Hablamos con Chema Alonso",
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
			description: "Sorteo de 2 libros de Git + GitHub",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Sorteo de 2 libros de Git + GitHub",
		startAt: 1757521500000, // 18:25H
		durationInMinutes: 5,
	},
	{
		speaker: {
			name: "Guillermo Rauch",
			description: "CEO de Vercel",
			imgUrl: "/speakers/guillermo-rauch.webp",
		},
		title: "Hablamos con Guillermo Rauch",
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
	},
	{
		speaker: {
			name: "InfoJobs",
			description: "Portal de empleo",
			imgUrl: "/speakers/midudev.webp",
		},
		title: "Charla con InfoJobs",
		startAt: 1757525100000, // 19:25H
		durationInMinutes: 5,
	},
	{
		speaker: {
			name: "???",
			description: "Sorpresa especial",
			imgUrl: "/speakers/speaker-01.webp",
		},
		title: "???",
		startAt: 1757525400000, // 19:30H
		durationInMinutes: 30,
	},
	{
		speaker: {
			name: "Theo",
			description: "Content Creator & Developer",
			imgUrl: "/speakers/theo.webp",
		},
		title: "Charla con Theo",
		startAt: 1757527200000, // 20:00H
		durationInMinutes: 60,
	},
];

/*
16:40    17:00    Cuenta atrás con Grimer
17:00    17:30    Q&A con Guillermo Rauch
17:30    17:40    Charla KeepCoding + Sorteo
17:40    17:50    Charla con Codely + Sorteo
17:50    18:00    Novedades midudev
18:00    18:30    Charla con Freddy Vega
18:30    18:35    Sorteo Platzi
18:35    18:45    S4vitar + Sorteo
18:45    19:10    Carmen Ansio (Animaciones CSS con scroll)
19:10    19:20    ¡Participa en el Mega Trivial!
19:20    19:40    Alba Silvente (???)
19:40    19:45    Sorteo con Malt
19:45    20:15    Estefany Aguilar (???)
20:15    20:25    ¡Participa en el Mega Trivial!
20:25    20:45    Pelado Nerd + Sorteo
20:45    20:50    Sorteos
20:50    21:00    Charla Cloudinary + Sorteo
21:00    21:05    ¡Más novedades midudev!
21:05    21:10    Sorteos
21:10    21:35    Charla con Fazt + Sorteo
21:35    22:05    Charla con DotCSV
22:05    22:15    ¡Participa en el Mega Trivial!
*/
