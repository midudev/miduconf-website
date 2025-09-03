import { forwardRef } from "react";

interface Props {
	className?: string;
}

export const Calendar = forwardRef<SVGSVGElement, Props>(
	({ className = "size-6" }, ref) => {
		return (
			<svg
				ref={ref}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className={className}
			>
				<path
					d="M15 2h2v2h4v18H3V4h4V2h2v2h6V2zM5 8h14V6H5v2zm0 2v10h14V10H5z"
					fill="currentColor"
				/>
			</svg>
		);
	},
);

Calendar.displayName = "Calendar";
