import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CHAT_MESSAGES } from "@/data/mock"
import type { PanelKind } from "@/types/meeting"

const TITLES: Record<string, string> = {
  chat: "In-call messages",
  people: "People",
  activities: "Activities",
}

interface SidePanelProps {
  kind: Exclude<PanelKind, null>
  onClose: () => void
}

/** Right-side floating panel (chat shown; others share the chrome). */
export function SidePanel({ kind, onClose }: SidePanelProps) {
  return (
    <aside className="flex w-[360px] shrink-0 flex-col rounded-2xl bg-gm-surface-1 text-gm-on-dark">
      {/* Header */}
      <div className="flex items-center justify-between py-2 pl-4 pr-2">
        <h2 className="font-display text-lg font-normal">{TITLES[kind]}</h2>
        <button
          aria-label="Close panel"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full text-gm-on-dark-muted transition-colors hover:bg-white/10"
        >
          <span className="icon-[material-symbols--close] size-5" />
        </button>
      </div>

      {kind === "chat" && <ChatBody />}
    </aside>
  )
}

function ChatBody() {
  return (
    <>
      <ScrollArea className="flex-1 px-4">
        <div className="mb-3 rounded-lg bg-gm-surface-2 p-3 text-center">
          <p className="mb-1 flex items-center justify-center gap-2 text-sm text-gm-on-dark">
            <span className="icon-[material-symbols--chat-bubble-outline] size-4" />
            Continuous chat is turned off
          </p>
          <p className="text-xs leading-relaxed text-gm-on-dark-muted">
            Messages will not be saved for meeting participants when the call ends.
            You can pin a message to make it visible for people who join later.
          </p>
        </div>

        {CHAT_MESSAGES.map((m) => (
          <div key={m.id} className="mb-4">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-sm font-medium text-gm-on-dark">{m.authorName}</span>
              <span className="text-xs text-gm-on-dark-muted">{m.timeLabel}</span>
            </div>
            <p className="text-sm text-gm-on-dark">{m.body}</p>
          </div>
        ))}
      </ScrollArea>

      {/* Composer */}
      <div className="p-4">
        <div className="flex items-center gap-1 rounded-3xl bg-gm-surface-2 pl-4 pr-1">
          <Input
            placeholder="Send a message"
            className="h-12 flex-1 border-0 bg-transparent px-0 font-display text-sm text-gm-on-dark placeholder:text-gm-on-dark-muted focus-visible:ring-0"
          />
          <button
            aria-label="Send a message"
            className="flex size-10 items-center justify-center rounded-full text-gm-on-dark-muted transition-colors hover:bg-white/10"
          >
            <span className="icon-[material-symbols--send] size-5" />
          </button>
        </div>
      </div>
    </>
  )
}
