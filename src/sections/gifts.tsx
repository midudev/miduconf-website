import { DiamondIcon } from "@/components/icons/diamond";
import { DotIcon } from "@/components/icons/dot";
import { Title } from "@/components/Title";
import { GiftItem } from "@/gifts/components/gift";
import { LIST_OF_GIFTS } from "@/gifts/constants/list-gifts";

export const Gifts = () => {
	return (
		<section id="regalos" className="pt-44">
			<Title>Regalos</Title>
			<p className="mx-auto mt-6 mb-16 text-xl text-white text-pretty max-w-[42ch] text-center px-4">
				+128 regalos. ¡Participa en el evento y gana!
			</p>
			<div className="relative grid grid-cols-1 gap-4 px-4 mx-auto mt-10 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
				{LIST_OF_GIFTS.map((gift, index) => (
					<GiftItem key={`${gift.title}-${index}`} {...gift} />
				))}
				{Array.from({ length: 2 }).map((_, i) => (
					<GiftItem
						key={`${i}-ghost`}
						className="hidden cursor-not-allowed pointer-events-none min-h-44 opacity-40 md:block"
					/>
				))}
			</div>
			<div className="relative md:hidden">
				<div className="[mask-image:linear-gradient(#000,_transparent)] relative grid grid-cols-1 gap-4 px-4 mx-auto mt-4 mb-10 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
					{Array.from({ length: 2 }).map((_, i) => (
						<GiftItem
							key={`${i}-ghost`}
							className="cursor-not-allowed pointer-events-none min-h-44 opacity-40"
						/>
					))}
				</div>
				<p className="text-xs md:text-xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center md:gap-2 z-10">
					<DiamondIcon className="w-4 h-auto md:w-8" />
					¡Muy pronto revelaremos más regalos!
					<DiamondIcon className="w-4 h-auto md:w-8" />
				</p>
			</div>
			<div className="relative hidden md:block">
				<div className="[mask-image:linear-gradient(#000,_transparent)] relative grid grid-cols-1 gap-4 px-4 mx-auto mt-4 mb-10 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
					{Array.from({ length: 2 }).map((_, i) => (
						<GiftItem
							key={`${i}-ghost`}
							className="cursor-not-allowed pointer-events-none min-h-44 opacity-40"
						/>
					))}
				</div>
				<p className="text-xs md:text-xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center md:gap-2 z-10">
					<DiamondIcon className="w-4 h-auto md:w-8" />
					¡Muy pronto revelaremos más regalos!
					<DiamondIcon className="w-4 h-auto md:w-8" />
				</p>
			</div>
			<small className="text-center w-auto mx-auto block text-white text-sm max-w-xl opacity-80 [text-wrap:balance] pt-8">
				Si ganas un sorteo y el premio no puede enviarse a tu país, buscaremos
				una alternativa de igual valor.
			</small>
			<small className="text-center w-auto mx-auto block text-palette-ghost text-sm max-w-xl opacity-80 [text-wrap:balance] pb-8 pt-2">
				* Cubrimos vuelos (desde ciudades con conexión a CDMX, Cancún o Mérida),
				hotel y el acceso VIP al fest.
			</small>
		</section>
	);
};
