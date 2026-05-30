import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type BarVariant = "default" | "active" | "danger" | "ghost"

interface BarButtonProps {
  icon: string
  label: string
  variant?: BarVariant
  width?: number
  onClick?: () => void
  className?: string
}

/** A single control-bar button (48px tall pill), dark in-call theme. */
export function BarButton({
  icon,
  label,
  variant = "default",
  width = 48,
  onClick,
  className,
}: BarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          aria-label={label}
          onClick={onClick}
          style={{ width, height: 48 }}
          className={cn(
            "inline-flex items-center justify-center rounded-3xl transition-colors",
            variant === "default" &&
              "bg-gm-btn text-gm-on-dark hover:bg-gm-btn-hover",
            variant === "active" &&
              "bg-[#a8c7fa] text-[#062e6f] hover:brightness-105",
            variant === "danger" && "bg-gm-red text-white hover:brightness-110",
            variant === "ghost" &&
              "bg-transparent text-gm-on-dark hover:bg-white/10",
            className,
          )}
        >
          <span className={cn(icon, "size-6")} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
