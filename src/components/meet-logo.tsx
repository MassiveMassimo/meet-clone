import { cn } from "@/lib/utils"

/**
 * Current Google Meet logo (2026 wordmark), extracted from
 * gstatic.com/meet/icons/logo_meet_2026_text_google_meet_light_web_*.svg
 * and served from public/meet-logo.svg. Aspect ratio 702:140 (~5.01:1).
 */
export function MeetLogo({ className }: { className?: string }) {
  return (
    <img
      src="/meet-logo.svg"
      alt="Google Meet"
      width={201}
      height={40}
      className={cn("h-10 w-auto select-none", className)}
    />
  )
}
