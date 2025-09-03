import { cn } from "@/lib/utils";
import { DotIcon } from "./icons/dot";

interface TitleProps {
	className?: string;
	children: React.ReactNode;
}

export function Title({ className = "", children }: TitleProps) {
	return (
		<h2
			className={cn(
				"flex uppercase text-3xl md:text-5xl font-semibold items-center gap-spacing-16 justify-center",
				className,
			)}
		>
			<DotIcon className="text-palette-primary" />
			{children}
			<DotIcon className="text-palette-primary" />
		</h2>
	);
}
