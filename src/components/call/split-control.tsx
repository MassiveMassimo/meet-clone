import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SplitControlProps {
  on: boolean
  iconOn: string
  iconOff: string
  labelOn: string
  labelOff: string
  settingsLabel: string
  onToggle: () => void
  className?: string
}

/**
 * Mic / camera split-button: a small settings/chevron segment (#282A2C) joined
 * to the toggle (#333537, or red when off), matching Meet's in-call control.
 */
export function SplitControl({
  on,
  iconOn,
  iconOff,
  labelOn,
  labelOff,
  settingsLabel,
  onToggle,
  className,
}: SplitControlProps) {
  return (
    <div className={cn("flex h-12 items-stretch overflow-hidden rounded-3xl", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label={settingsLabel}
            className="flex w-10 items-center justify-center bg-gm-surface-2 pl-1 text-gm-on-dark-muted transition-colors hover:bg-gm-btn-hover"
          >
            <span className="icon-[material-symbols--keyboard-arrow-up] size-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{settingsLabel}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label={on ? labelOn : labelOff}
            onClick={onToggle}
            className={cn(
              "flex w-12 items-center justify-center transition-colors",
              on
                ? "bg-gm-btn text-gm-on-dark hover:bg-gm-btn-hover"
                : "bg-gm-red text-white hover:brightness-110",
            )}
          >
            <span className={cn(on ? iconOn : iconOff, "size-6")} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{on ? labelOn : labelOff}</TooltipContent>
      </Tooltip>
    </div>
  )
}
