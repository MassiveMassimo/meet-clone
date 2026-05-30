import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { MeetLogo } from "@/components/meet-logo"
import { AccountChip } from "@/components/account-chip"
import { CameraPreview } from "@/components/camera-preview"
import { DeviceSelectors } from "@/components/device-selectors"
import { JoinPanel } from "@/components/join-panel"
import { SELF } from "@/data/mock"

export function PreJoinScreen() {
  const navigate = useNavigate()
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <MeetLogo />
        <AccountChip email="mhmmadjid@gmail.com" name={SELF.name} />
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="flex w-full max-w-[1100px] flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-16">
          {/* Left: preview + devices */}
          <div className="flex w-full max-w-[740px] flex-col gap-4">
            <CameraPreview
              name={SELF.name}
              micOn={micOn}
              cameraOn={cameraOn}
              onToggleMic={() => setMicOn((v) => !v)}
              onToggleCamera={() => setCameraOn((v) => !v)}
            />
            <div className="hidden sm:block">
              <DeviceSelectors />
            </div>
          </div>

          {/* Right: join panel */}
          <div className="flex w-full justify-center lg:w-auto lg:min-w-[360px]">
            <JoinPanel onJoin={() => navigate({ to: "/call" })} />
          </div>
        </div>
      </main>
    </div>
  )
}
