import { gsap } from "gsap";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRemainingTime } from "../hooks/useRemainingTime";
import { Clock } from "./icons/clock";

const LITERALS = ["d", null, "h", null, "m", null, "s"];
// const EVENT_DATE = 1757512800000 // 10 de septiembre de 2025 - 16:00h CEST

export function Countdown({ className }) {
	const id = useId();
	const { seconds, minutes, hours, days } = useRemainingTime(
		new Date(1757516400000),
		{
			fillingZeros: true,
		},
	);
	const [show, setShow] = useState(false);
	const clockRef = useRef(null);
	const scrollClockRef = useRef(null);

	useEffect(() => {
		const animateClock = (ref) => {
			const clock = ref.current;
			if (!clock) return;

			let currentRotation = 90;
			const rect = clock.querySelectorAll("rect");
			if (!rect[6]) return;

			const interval = setInterval(() => {
				gsap.to(rect[6], {
					rotate: currentRotation,
					y: -1,
					duration: 1.0,
					transformOrigin: "center 100%",
					ease: "elastic.out(1, 0.5)",
				});
				currentRotation += 90;
			}, 1000);
			return interval;
		};

		const interval1 = animateClock(clockRef);
		const interval2 = animateClock(scrollClockRef);

		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
		};
	}, []);
	useEffect(() => {
		// solo en client side para evitar problemas de hidratacion
		setShow(true);
	}, []);

	const showValue = (value) => {
		if (value === null) return;

		if (show) return value;
		return "00";
	};

	return (
		<>
			<div
				className={cn(
					"flex items-center gap-4 text-xl font-cta bg-palette-bg-foreground-primary border border-palette-border-foreground p-spacing-16 rounded-[8px] shadow-lg",
					className,
				)}
			>
				<Clock ref={clockRef} className="clock size-[24px]" />
				<div className="flex items-center gap-2">
					{[days, null, hours, null, minutes, null, seconds].map(
						(value, index) => {
							return (
								<div key={id}>
									<div className="flex items-center justify-center text-center">
										<span className="tabular-nums text-3xl-cta uppercase">
											{showValue(value)}
										</span>
										<span className="uppercase">
											{value === null ? " " : LITERALS[index]}
										</span>
									</div>
								</div>
							);
						},
					)}
				</div>
			</div>
			{/* <ScrollCountdown scrollClockRef={scrollClockRef} /> */}
		</>
	);
}
