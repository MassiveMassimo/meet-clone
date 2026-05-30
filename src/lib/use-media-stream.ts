import { useEffect, useRef, useState } from "react"

interface MediaState {
  stream: MediaStream | null
  /** True once a camera stream is active. */
  active: boolean
  error: string | null
}

/**
 * Acquire the user's webcam via getUserMedia, mirroring Google Meet's preview.
 * Runs only on the client; toggling `enabled` off stops the tracks.
 */
export function useMediaStream(enabled: boolean): MediaState & {
  videoRef: React.RefObject<HTMLVideoElement | null>
} {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [state, setState] = useState<MediaState>({
    stream: null,
    active: false,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    function stop() {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      if (videoRef.current) videoRef.current.srcObject = null
    }

    if (!enabled) {
      stop()
      setState({ stream: null, active: false, error: null })
      return
    }

    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      setState({ stream: null, active: false, error: "unsupported" })
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setState({ stream, active: true, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            stream: null,
            active: false,
            error: err instanceof Error ? err.name : "denied",
          })
        }
      })

    return () => {
      cancelled = true
      stop()
    }
  }, [enabled])

  return { ...state, videoRef }
}
