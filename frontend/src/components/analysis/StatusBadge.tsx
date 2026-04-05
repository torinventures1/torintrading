import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  isLive: boolean
}

export default function StatusBadge({ isLive }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
        isLive
          ? 'bg-profit/20 text-profit'
          : 'bg-gray-500/20 text-gray-400'
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
