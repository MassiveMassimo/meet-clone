import { useEffect, useRef } from "react"
import { useAudioLevel } from "@/lib/use-audio-level"
import { cn } from "@/lib/utils"

interface MicIndicatorProps {
  active: boolean
  className?: string
}

const DOT = 4 // resting (silent) size — a round dot
const MAX = 16 // peak bar height

/**
 * Live microphone level indicator shown on the camera tile (bottom-left),
 * matching Meet's 26px circle (#a8c7fa) with three #062e6f bars. Bars animate
 * height between a round dot (silent) and a full bar (loud). Hidden when muted.
 */
export function MicIndicator({ active, className }: MicIndicatorProps) {
  const levelRef = useAudioLevel(active)
  const dotRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ]

  useEffect(() => {
    if (!active) return
    let raf = 0
    const weights = [0.7, 1, 0.7] // centre bar reacts strongest
    const animate = () => {
      const level = levelRef.current
      dotRefs.forEach((ref, i) => {
        const el = ref.current
        if (!el) return
        const h = DOT + Math.min(1, level * weights[i]) * (MAX - DOT)
        el.style.height = `${h}px`
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  if (!active) return null

  return (
    <div
      aria-label="Microphone level"
      className={cn(
        "flex size-[26px] items-center justify-center gap-[3px] rounded-full bg-[#a8c7fa]",
        className,
      )}
    >
      {dotRefs.map((ref, i) => (
        <span
          key={i}
          ref={ref}
          className="w-[4px] rounded-full bg-[#062e6f]"
          style={{ height: DOT }}
        />
      ))}
    </div>
  )
}
