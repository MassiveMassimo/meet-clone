import { BarButton } from "@/components/call/bar-button"
import { SplitControl } from "@/components/call/split-control"
import type { PanelKind } from "@/types/meeting"
import { cn } from "@/lib/utils"

interface ControlBarProps {
  micOn: boolean
  cameraOn: boolean
  onToggleMic: () => void
  onToggleCamera: () => void
  onLeave: () => void
  panel: PanelKind
  onTogglePanel: (panel: PanelKind) => void
}

export function ControlBar({
  micOn,
  cameraOn,
  onToggleMic,
  onToggleCamera,
  onLeave,
  panel,
  onTogglePanel,
}: ControlBarProps) {
  return (
    <div className="relative flex h-20 items-center justify-center px-4">
      {/* Centered controls */}
      <div className="flex items-center gap-2">
        <BarButton
          icon="icon-[material-symbols--more-horiz]"
          label="Host controls"
          width={52}
          className="hidden md:inline-flex"
        />

        {/* Mic: split-button on desktop, plain toggle on mobile */}
        <SplitControl
          on={micOn}
          iconOn="icon-[material-symbols--mic]"
          iconOff="icon-[material-symbols--mic-off]"
          labelOn="Turn off microphone"
          labelOff="Turn on microphone"
          settingsLabel="Audio settings"
          onToggle={onToggleMic}
          className="hidden md:flex"
        />
        <BarButton
          icon={micOn ? "icon-[material-symbols--mic]" : "icon-[material-symbols--mic-off]"}
          label={micOn ? "Turn off microphone" : "Turn on microphone"}
          variant={micOn ? "default" : "danger"}
          onClick={onToggleMic}
          className="md:hidden"
        />

        {/* Camera: split-button on desktop, plain toggle on mobile */}
        <SplitControl
          on={cameraOn}
          iconOn="icon-[material-symbols--videocam]"
          iconOff="icon-[material-symbols--videocam-off]"
          labelOn="Turn off camera"
          labelOff="Turn on camera"
          settingsLabel="Video settings"
          onToggle={onToggleCamera}
          className="hidden md:flex"
        />
        <BarButton
          icon={
            cameraOn
              ? "icon-[material-symbols--videocam]"
              : "icon-[material-symbols--videocam-off]"
          }
          label={cameraOn ? "Turn off camera" : "Turn on camera"}
          variant={cameraOn ? "default" : "danger"}
          onClick={onToggleCamera}
          className="md:hidden"
        />

        <BarButton
          icon="icon-[material-symbols--present-to-all-outline]"
          label="Present now"
          width={56}
          className="hidden md:inline-flex"
        />
        <BarButton
          icon="icon-[material-symbols--mood]"
          label="Send a reaction"
          width={56}
          className="hidden md:inline-flex"
        />
        <BarButton
          icon="icon-[material-symbols--closed-caption-outline]"
          label="Turn on captions"
          width={56}
          className="hidden md:inline-flex"
        />
        <BarButton
          icon="icon-[material-symbols--front-hand-outline]"
          label="Raise hand"
          width={56}
        />

        {/* Chat — in the centered row on mobile, in the right group on desktop */}
        <BarButton
          icon="icon-[material-symbols--chat-bubble-outline]"
          label="Chat with everyone"
          variant={panel === "chat" ? "active" : "default"}
          onClick={() => onTogglePanel("chat")}
          className="md:hidden"
        />

        <BarButton
          icon="icon-[material-symbols--more-vert]"
          label="More options"
          width={56}
        />
        <BarButton
          icon="icon-[material-symbols--call-end]"
          label="Leave call"
          variant="danger"
          width={72}
          onClick={onLeave}
        />
      </div>

      {/* Right group (desktop only) */}
      <div className="absolute right-4 hidden items-center gap-1 md:flex">
        <BarButton
          icon="icon-[material-symbols--chat-bubble-outline]"
          label="Chat with everyone"
          variant={panel === "chat" ? "active" : "ghost"}
          className={cn(panel === "chat" && "rounded-3xl")}
          onClick={() => onTogglePanel("chat")}
        />
        <BarButton
          icon="icon-[material-symbols--apps]"
          label="Activities"
          variant={panel === "activities" ? "active" : "ghost"}
          onClick={() => onTogglePanel("activities")}
        />
      </div>
    </div>
  )
}
