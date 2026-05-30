import type { RefObject } from "react"
import type { Participant } from "@/types/meeting"
import { cn } from "@/lib/utils"

interface ParticipantTileProps {
  participant: Participant
  /** When provided and camera is on, renders this live video (self-view). */
  videoRef?: RefObject<HTMLVideoElement | null>
  showVideo?: boolean
  mirror?: boolean
  rounded?: string
  className?: string
}

export function ParticipantTile({
  participant,
  videoRef,
  showVideo,
  mirror,
  rounded = "rounded-3xl",
  className,
}: ParticipantTileProps) {
  return (
    <div
      className={cn(
        // translateZ(0) forces a compositing layer so the rounded corners clip
        // the mirrored (transformed) <video> child correctly.
        "relative size-full overflow-hidden [transform:translateZ(0)]",
        rounded,
        className,
      )}
      style={{ backgroundColor: showVideo ? "#000" : participant.tileColor }}
    >
      {videoRef && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            // Round the video itself: the mirror transform lives on this element,
            // so its own border-radius clips reliably (parent clip would escape).
            "size-full object-cover transition-opacity",
            rounded,
            mirror && "video-mirror",
            showVideo ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* Camera-off: centered avatar */}
      {!showVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-black/25 font-display text-4xl text-white">
            {participant.name.charAt(0)}
          </div>
        </div>
      )}

      {/* Bottom scrim for legibility */}
      <div className="tile-scrim pointer-events-none absolute inset-x-0 bottom-0 h-20" />

      {/* Name label */}
      <span className="absolute bottom-3 left-4 font-display text-base font-medium text-white">
        {participant.name}
      </span>

      {/* Mic-muted badge */}
      {!participant.micOn && (
        <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-[#3c4043]/80">
          <span className="icon-[material-symbols--mic-off] size-5 text-white" />
        </div>
      )}
    </div>
  )
}
