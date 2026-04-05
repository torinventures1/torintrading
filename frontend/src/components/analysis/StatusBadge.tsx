import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  isLive: boolean
}

export default function StatusBadge({ isLive }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border',
        isLive
          ? 'bg-profit/10 text-profit border-profit/20'
          : 'bg-white/5 text-gray-400 border-white/10'
      )}
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          isLive ? 'bg-profit animate-pulse' : 'bg-gray-500'
        )}
      />
      {isLive ? 'LIVE' : 'ENDED'}
    </div>
  )
}
