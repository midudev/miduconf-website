import { Miduconf } from "@/components/icons/miduconf";

export function PreFooter() {
  return (
		<div className="w-full flex relative z-10 items-center justify-center px-5 pt-spacing-180 pb-spacing-32 md:pb-spacing-40 lg:pb-spacing-64 bg-palette-background border-b border-palette-border-foreground after:absolute after:h-[20px] after:lg:h-[60px] after:top-[100.3%] lg:after:top-[100.2%] 2xl:after:top-[100.1%] after:inset-0 after:bg-gradient-to-t after:from-transparent after:to-palette-background after:pointer-events-none">
			<Miduconf className="w-full h-full" />
		</div>
  )
}
