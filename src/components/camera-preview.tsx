import { useMediaStream } from "@/lib/use-media-stream"
import { CircleControl } from "@/components/circle-control"
import { MicIndicator } from "@/components/mic-indicator"
import { cn } from "@/lib/utils"

interface CameraPreviewProps {
  name: string
  micOn: boolean
  cameraOn: boolean
  onToggleMic: () => void
  onToggleCamera: () => void
  className?: string
}

/** Pre-join camera preview tile with live webcam and overlay controls. */
export function CameraPreview({
  name,
  micOn,
  cameraOn,
  onToggleMic,
  onToggleCamera,
  className,
}: CameraPreviewProps) {
  const { videoRef, active } = useMediaStream(cameraOn)

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-[#202124]",
        className,
      )}
    >
      {/* Live webcam (mirrored like Meet) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "video-mirror size-full object-cover transition-opacity",
          cameraOn && active ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Camera-off fallback: centered "Camera is off" text */}
      {!(cameraOn && active) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[22px] font-normal leading-7 text-white">
            Camera is off
          </span>
        </div>
      )}

      {/* Name label (top-left) */}
      <span className="absolute left-4 top-3 font-display text-sm font-medium tracking-[0.25px] text-white drop-shadow">
        {name}
      </span>

      {/* Options (top-right) */}
      <button
        aria-label="More options"
        className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
      >
        <span className="icon-[material-symbols--more-vert] size-6" />
      </button>

      {/* Live mic level indicator (bottom-left); hidden when mic is off */}
      <MicIndicator active={micOn} className="absolute bottom-4 left-4" />

      {/* Mic + camera (bottom-center) */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-6">
        <CircleControl
          icon={
            micOn
              ? "icon-[material-symbols--mic-outline]"
              : "icon-[material-symbols--mic-off]"
          }
          label={micOn ? "Turn off microphone" : "Turn on microphone"}
          variant={micOn ? "outline" : "danger"}
          onClick={onToggleMic}
        />
        <CircleControl
          icon={
            cameraOn
              ? "icon-[material-symbols--videocam-outline]"
              : "icon-[material-symbols--videocam-off]"
          }
          label={cameraOn ? "Turn off camera" : "Turn on camera"}
          variant={cameraOn ? "outline" : "danger"}
          onClick={onToggleCamera}
        />
      </div>

      {/* Visual effects (bottom-right) */}
      <CircleControl
        icon="icon-[material-symbols--background-replace]"
        label="Apply visual effects"
        variant="outline"
        className="absolute bottom-4 right-4"
      />
    </div>
  )
}
