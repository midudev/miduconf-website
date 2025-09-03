import { useEffect, useState } from "react";
import { Calendar } from "@/components/icons/calendar";
import { CONFERENCE_CONFIG } from "@/config/conference";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export function ConferenceDate({ className }: Props) {
	const [formattedDate, setFormattedDate] = useState(() => {
		const staticFormatted = CONFERENCE_CONFIG.getStaticFormattedDate();
		return staticFormatted.FULL;
	});

	useEffect(() => {
		const formatted = CONFERENCE_CONFIG.getFormattedDate();
		setFormattedDate(formatted.full);
	}, []);

	return (
		<div
			className={cn(
				"flex items-center gap-4 bg-palette-bg-foreground-primary border border-palette-border-foreground p-spacing-16 rounded-[8px] shadow-lg",
				className,
			)}
		>
			<Calendar className="size-[24px] text-[#5A8CF6]" />
			<span className="text-xl font-cta uppercase">{formattedDate}</span>
		</div>
	);
}
