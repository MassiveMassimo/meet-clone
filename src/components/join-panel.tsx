import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface JoinPanelProps {
  onJoin: () => void
}

/** Right-column "Ready to join?" panel. */
export function JoinPanel({ onJoin }: JoinPanelProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="font-display text-[28px] font-normal leading-9 text-gm-text">
        Ready to join?
      </h1>

      <button
        onClick={onJoin}
        className="h-14 min-w-[240px] rounded-[28px] bg-gm-blue px-6 font-display text-sm font-medium text-white transition-[box-shadow,background-color] hover:bg-gm-blue-hover hover:shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_rgba(60,64,67,0.15)]"
      >
        Ask to join
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-[20px] border border-gm-outline pl-6 pr-4 font-display text-sm font-medium text-gm-blue transition-colors hover:bg-gm-hover-overlay focus:outline-none">
          Other ways to join
          <span className="icon-[material-symbols--keyboard-arrow-down] size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>
            <span className="icon-[material-symbols--phone-enabled-outline] mr-2 size-5" />
            Join and use a phone for audio
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="icon-[material-symbols--cast] mr-2 size-5" />
            Cast this meeting
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
