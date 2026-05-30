/** Domain types for the Meet clone. */

export type DeviceKind = "mic" | "speaker" | "camera"

export interface MediaDevice {
  id: string
  kind: DeviceKind
  label: string
}

export interface Participant {
  id: string
  name: string
  /** Avatar image url; when absent a colored initial tile is shown. */
  avatarUrl?: string
  /** Pastel background for the camera-off tile (CSS color). */
  tileColor: string
  isSelf?: boolean
  isHost?: boolean
  micOn: boolean
  cameraOn: boolean
  handRaised?: boolean
  /** Optional live MediaStream rendered into the tile (self-view). */
  speaking?: boolean
}

export interface MeetingInfo {
  code: string
  /** Display time in the top bar, e.g. "11:25 AM". */
  startedAtLabel: string
}

export interface ChatMessage {
  id: string
  authorId: string
  authorName: string
  timeLabel: string
  body: string
}

export type PanelKind = "chat" | "people" | "activities" | "info" | null
