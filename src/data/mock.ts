import type {
  ChatMessage,
  MediaDevice,
  MeetingInfo,
  Participant,
} from "@/types/meeting"

export const MEETING: MeetingInfo = {
  code: "vdb-mjjc-dsi",
  startedAtLabel: "11:25 AM",
}

export const SELF_ID = "self"

/** The local user (matches the captured account "Imo Madjid"). */
export const SELF: Participant = {
  id: SELF_ID,
  name: "Imo Madjid",
  tileColor: "var(--gm-tile-2)",
  isSelf: true,
  micOn: true,
  cameraOn: true,
}

/** Remote participants for the in-call grid. */
export const PARTICIPANTS: Participant[] = [
  {
    id: "p-host",
    name: "Imo Madjid",
    tileColor: "var(--gm-tile-1)",
    isHost: true,
    micOn: false,
    cameraOn: false,
  },
]

export const DEVICES: MediaDevice[] = [
  { id: "mic-default", kind: "mic", label: "MacBook Pro Microphone" },
  { id: "spk-default", kind: "speaker", label: "MacBook Pro Speakers" },
  { id: "cam-default", kind: "camera", label: "MacBook Pro Camera" },
]

export const CHAT_MESSAGES: ChatMessage[] = []
