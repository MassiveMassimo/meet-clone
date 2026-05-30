import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type CircleVariant = "outline" | "danger" | "ghost"

interface CircleControlProps {
  icon: string
  label: string
  variant?: CircleVariant
  size?: number
  iconSize?: number
  onClick?: () => void
  className?: string
}

/**
 * Circular control used on the camera-preview tile (mic / camera / effects).
 * outline = active state (transparent, white ring); danger = off state (red fill).
 */
export function CircleControl({
  icon,
  label,
  variant = "outline",
  size = 56,
  iconSize = 22,
  onClick,
  className,
}: CircleControlProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          aria-label={label}
          onClick={onClick}
          style={{ width: size, height: size }}
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-colors",
            variant === "outline" &&
              "border border-white text-white hover:bg-white/10",
            variant === "danger" &&
              "bg-gm-red text-white hover:brightness-110",
            variant === "ghost" &&
              "text-white hover:bg-white/10",
            className,
          )}
        >
          <span
            className={cn(icon)}
            style={{ width: iconSize, height: iconSize }}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
