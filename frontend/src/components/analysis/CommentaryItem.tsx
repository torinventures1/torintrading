import { cn } from '@/lib/utils'
import type { Commentary } from '@/types'

interface CommentaryItemProps {
  item: Commentary
}

export default function CommentaryItem({ item }: CommentaryItemProps) {
  const time = new Date(item.created_at).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const getTypeStyles = () => {
    switch (item.trade_type) {
      case 'long':
        return 'text-profit'
      case 'short':
        return 'text-loss'
      case 'target':
        return 'text-profit'
      case 'exit':
        return 'text-yellow-500'
      default:
        return 'text-gray-300'
    }
  }

  const getBadge = () => {
    switch (item.trade_type) {
      case 'long':
        return (
          <span className="px-2 py-1 bg-profit/20 text-profit text-xs rounded font-medium">
            LONG
          </span>
        )
      case 'short':
        return (
          <span className="px-2 py-1 bg-loss/20 text-loss text-xs rounded font-medium">
            SHORT
          </span>
        )
      case 'target':
        return (
          <span className="px-2 py-1 bg-profit/20 text-profit text-xs rounded font-medium">
            TARGET
          </span>
        )
      case 'exit':
        return (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded font-medium">
            EXIT
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
      <span className="text-gray-500 text-sm font-mono shrink-0 pt-0.5">
        {time}
      </span>
      <span className={cn('flex-1', getTypeStyles())}>
        {item.message}
        {item.price_level && (
          <span className="text-gray-400 ml-2">@ {item.price_level}</span>
        )}
      </span>
      {getBadge()}
    </div>
  )
}
