import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MEETING, PARTICIPANTS, SELF } from "@/data/mock"

function formatNow() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

/** In-call top bar: clock · meeting code · info (left); participants (right). */
export function TopBar() {
  const total = PARTICIPANTS.length + 1
  const people = [SELF, ...PARTICIPANTS]

  // Client-only clock to avoid SSR hydration mismatch; refresh each minute.
  const [time, setTime] = useState("")
  useEffect(() => {
    setTime(formatNow())
    const id = setInterval(() => setTime(formatNow()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="flex items-center justify-between px-4 py-3 text-gm-on-dark">
      <div className="flex items-center gap-3 font-display text-base">
        <span className="font-medium tabular-nums">{time}</span>
        <span className="text-gm-on-dark-muted">|</span>
        <span className="font-medium">{MEETING.code}</span>
        <button
          aria-label="Meeting details"
          className="flex size-9 items-center justify-center rounded-full text-gm-on-dark-muted transition-colors hover:bg-white/10"
        >
          <span className="icon-[material-symbols--info-outline] size-5" />
        </button>
      </div>

      <button className="flex items-center gap-2 rounded-full bg-gm-surface-2 py-1 pl-1 pr-3 transition-colors hover:bg-gm-btn">
        <div className="flex -space-x-2">
          {people.slice(0, 2).map((p) => (
            <Avatar key={p.id} className="size-7 ring-2 ring-gm-surface-2">
              <AvatarFallback className="bg-[#a142f4] text-xs font-medium text-white">
                {p.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="font-display text-sm font-medium tabular-nums">{total}</span>
      </button>
    </header>
  )
}
