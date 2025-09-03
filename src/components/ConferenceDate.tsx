import { Calendar } from "@/components/icons/calendar";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export function ConferenceDate({ className }: Props) {
	return (
		<div
			className={cn(
				"flex items-center gap-4 bg-palette-bg-foreground-primary border border-palette-border-foreground p-spacing-16 rounded-[8px] shadow-lg",
				className,
			)}
		>
			<Calendar className="size-[24px] text-[#5A8CF6]" />
			<span className="text-xl font-cta uppercase">
				10 DE SEPTIEMBRE 2025 - 17:00H CEST
			</span>
		</div>
	);
}
