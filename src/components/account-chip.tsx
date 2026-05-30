import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AccountChipProps {
  email: string
  name: string
  avatarUrl?: string
}

/** Top-right account block on the pre-join screen. */
export function AccountChip({ email, name, avatarUrl }: AccountChipProps) {
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <div className="flex items-center gap-3">
      <div className="text-right leading-tight">
        <div className="text-[13px] text-gm-text">{email}</div>
        <button className="text-[13px] text-gm-text-secondary hover:underline">
          Switch account
        </button>
      </div>
      <button className="rounded-full ring-offset-2 transition hover:opacity-90">
        <Avatar className="size-8">
          {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
          <AvatarFallback className="bg-[#a142f4] text-[13px] font-medium text-white">
            {initial}
          </AvatarFallback>
        </Avatar>
      </button>
    </div>
  )
}
