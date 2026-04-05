import CommentaryItem from './CommentaryItem'
import type { Commentary } from '@/types'

interface CommentaryBoxProps {
  items: Commentary[]
  isLoading?: boolean
}

export default function CommentaryBox({ items, isLoading }: CommentaryBoxProps) {
  if (isLoading) {
    return (
      <div className="bg-dark-lighter rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Live Commentary</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-4 bg-gray-700 rounded" />
              <div className="flex-1 h-4 bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-lighter rounded-xl border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Live Commentary</h3>
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No commentary yet. Check back when the market is open.
        </p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {items.map((item) => (
            <CommentaryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
