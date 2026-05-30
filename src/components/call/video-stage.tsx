import { useMediaStream } from "@/lib/use-media-stream"
import { ParticipantTile } from "@/components/call/participant-tile"
import { PARTICIPANTS, SELF } from "@/data/mock"

interface VideoStageProps {
  selfMicOn: boolean
  selfCameraOn: boolean
}

/**
 * Video area. Desktop: spotlight tile with a floating self-view PiP.
 * Mobile: a single column, two equal rows (other participant + self).
 * One self <video> element keeps the webcam ref valid across both layouts.
 */
export function VideoStage({ selfMicOn, selfCameraOn }: VideoStageProps) {
  const { videoRef, active } = useMediaStream(selfCameraOn)
  const spotlight = PARTICIPANTS[0]
  const self = { ...SELF, micOn: selfMicOn, cameraOn: selfCameraOn }

  return (
    <div className="relative flex h-full flex-1 flex-col gap-2 px-2 pb-2 md:block md:p-2">
      {/* Spotlight (remote / host) */}
      <div className="min-h-0 flex-1 md:h-full">
        <ParticipantTile participant={spotlight} className="h-full" />
      </div>

      {/* Self-view: stacked row on mobile, floating PiP on desktop.
          Rounded here too so the PiP box-shadow follows the rounded corners. */}
      <div className="min-h-0 flex-1 rounded-2xl md:absolute md:bottom-5 md:right-5 md:h-[135px] md:w-60 md:flex-none md:rounded-xl md:shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
        <ParticipantTile
          participant={self}
          videoRef={videoRef}
          showVideo={selfCameraOn && active}
          mirror
          rounded="rounded-2xl md:rounded-xl"
        />
      </div>
    </div>
  )
}
