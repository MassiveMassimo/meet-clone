import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DEVICE_FALLBACK,
  useMediaDevices,
  type DeviceOption,
} from "@/lib/use-media-devices"
import type { DeviceKind } from "@/types/meeting"

const ICONS: Record<DeviceKind, string> = {
  mic: "icon-[material-symbols--mic-outline]",
  speaker: "icon-[material-symbols--volume-up-outline]",
  camera: "icon-[material-symbols--videocam-outline]",
}

const KINDS: DeviceKind[] = ["mic", "speaker", "camera"]

function DevicePill({ kind, options }: { kind: DeviceKind; options: DeviceOption[] }) {
  const [selected, setSelected] = useState(0)
  const label = options[selected]?.label ?? DEVICE_FALLBACK[kind]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-10 max-w-[200px] items-center gap-2 rounded-full border border-gm-divider px-3 text-sm text-gm-text transition-colors hover:bg-black/5 focus:outline-none">
        <span className={`${ICONS[kind]} size-5 shrink-0 text-gm-text-secondary`} />
        <span className="truncate">{label}</span>
        <span className="icon-[material-symbols--arrow-drop-down] size-5 shrink-0 text-gm-text-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-w-[280px]">
        {options.length === 0 ? (
          <DropdownMenuCheckboxItem checked disabled>
            {DEVICE_FALLBACK[kind]}
          </DropdownMenuCheckboxItem>
        ) : (
          options.map((opt, i) => (
            <DropdownMenuCheckboxItem
              key={opt.deviceId || i}
              checked={i === selected}
              onCheckedChange={() => setSelected(i)}
            >
              {opt.label}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Mic / speaker / camera selector row populated from real device enumeration. */
export function DeviceSelectors() {
  const devices = useMediaDevices()
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {KINDS.map((kind) => (
        <DevicePill key={kind} kind={kind} options={devices[kind]} />
      ))}
    </div>
  )
}
