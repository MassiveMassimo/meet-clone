import { useEffect, useState } from "react"
import type { DeviceKind } from "@/types/meeting"

export interface DeviceOption {
  deviceId: string
  label: string
  kind: DeviceKind
}

const KIND_MAP: Record<string, DeviceKind> = {
  audioinput: "mic",
  audiooutput: "speaker",
  videoinput: "camera",
}

const FALLBACK: Record<DeviceKind, string> = {
  mic: "Default - Microphone",
  speaker: "Default - Speaker",
  camera: "Default - Camera",
}

export type DeviceMap = Record<DeviceKind, DeviceOption[]>

/**
 * Enumerates the user's real media devices. Labels populate once any
 * mic/camera permission is granted; re-runs on `devicechange`. Client-only.
 */
export function useMediaDevices(): DeviceMap {
  const [devices, setDevices] = useState<DeviceMap>({
    mic: [],
    speaker: [],
    camera: [],
  })

  useEffect(() => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.enumerateDevices
    ) {
      return
    }
    let cancelled = false

    const load = async () => {
      try {
        const list = await navigator.mediaDevices.enumerateDevices()
        if (cancelled) return
        const grouped: DeviceMap = { mic: [], speaker: [], camera: [] }
        list.forEach((d) => {
          const kind = KIND_MAP[d.kind]
          if (!kind) return
          grouped[kind].push({
            deviceId: d.deviceId,
            label: d.label || FALLBACK[kind],
            kind,
          })
        })
        setDevices(grouped)
      } catch {
        /* enumeration unavailable */
      }
    }

    load()
    navigator.mediaDevices.addEventListener("devicechange", load)
    return () => {
      cancelled = true
      navigator.mediaDevices.removeEventListener("devicechange", load)
    }
  }, [])

  return devices
}

export { FALLBACK as DEVICE_FALLBACK }
