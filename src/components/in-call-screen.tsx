import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { TopBar } from "@/components/call/top-bar"
import { VideoStage } from "@/components/call/video-stage"
import { ControlBar } from "@/components/call/control-bar"
import { SidePanel } from "@/components/call/side-panel"
import type { PanelKind } from "@/types/meeting"

export function InCallScreen() {
  const navigate = useNavigate()
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [panel, setPanel] = useState<PanelKind>(null)

  const togglePanel = (next: PanelKind) =>
    setPanel((cur) => (cur === next ? null : next))

  return (
    <div className="dark flex h-screen flex-col overflow-hidden bg-gm-stage">
      <TopBar />

      <div className="flex flex-1 gap-2 overflow-hidden pb-2 pr-2">
        <VideoStage selfMicOn={micOn} selfCameraOn={cameraOn} />
        {panel && <SidePanel kind={panel} onClose={() => setPanel(null)} />}
      </div>

      <ControlBar
        micOn={micOn}
        cameraOn={cameraOn}
        onToggleMic={() => setMicOn((v) => !v)}
        onToggleCamera={() => setCameraOn((v) => !v)}
        onLeave={() => navigate({ to: "/" })}
        panel={panel}
        onTogglePanel={togglePanel}
      />
    </div>
  )
}
