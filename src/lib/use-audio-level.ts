import { useEffect, useRef } from "react"

/**
 * Measures live microphone loudness via the Web Audio API.
 * Returns a ref holding the current level (0..1), updated each animation frame
 * so consumers can animate without triggering React re-renders.
 * Runs only on the client; releases the mic + audio graph when disabled.
 */
export function useAudioLevel(enabled: boolean) {
  const levelRef = useRef(0)

  useEffect(() => {
    if (!enabled || typeof navigator === "undefined" || !navigator.mediaDevices) {
      levelRef.current = 0
      return
    }

    let cancelled = false
    let raf = 0
    let ctx: AudioContext | null = null
    let stream: MediaStream | null = null

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        ctx = new AudioContext()
        void ctx.resume()
        const source = ctx.createMediaStreamSource(s)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.8
        source.connect(analyser)
        const data = new Uint8Array(analyser.frequencyBinCount)

        const tick = () => {
          analyser.getByteFrequencyData(data)
          let sum = 0
          for (let i = 0; i < data.length; i++) sum += data[i]
          // Normalize and lift the floor so quiet speech still registers.
          const avg = sum / data.length / 255
          levelRef.current = Math.min(1, avg * 2.2)
          raf = requestAnimationFrame(tick)
        }
        tick()
      })
      .catch(() => {
        /* mic denied — indicator stays idle */
      })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      stream?.getTracks().forEach((t) => t.stop())
      void ctx?.close()
      levelRef.current = 0
    }
  }, [enabled])

  return levelRef
}
