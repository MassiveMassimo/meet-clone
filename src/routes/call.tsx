import { createFileRoute } from '@tanstack/react-router'
import { InCallScreen } from '@/components/in-call-screen'

export const Route = createFileRoute('/call')({ component: InCallScreen })
