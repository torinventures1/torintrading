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
          <span className="px-2.5 py-1 bg-profit/10 text-profit text-xs rounded-full font-medium border border-profit/20">
            LONG
          </span>
        )
      case 'short':
        return (
          <span className="px-2.5 py-1 bg-loss/10 text-loss text-xs rounded-full font-medium border border-loss/20">
            SHORT
          </span>
        )
      case 'target':
        return (
          <span className="px-2.5 py-1 bg-profit/10 text-profit text-xs rounded-full font-medium border border-profit/20">
            TARGET
          </span>
        )
      case 'exit':
        return (
          <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full font-medium border border-yellow-500/20">
            EXIT
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex items-start gap-4 py-4 px-4 -mx-4 rounded-xl hover:bg-white/[0.02] transition-colors">
      <span className="text-gray-600 text-sm font-mono shrink-0 pt-0.5">
        {time}
      </span>
      <span className={cn('flex-1 leading-relaxed', getTypeStyles())}>
        {item.message}
        {item.price_level && (
          <span className="text-gray-500 ml-2">@ {item.price_level}</span>
        )}
      </span>
      {getBadge()}
    </div>
  )
}
