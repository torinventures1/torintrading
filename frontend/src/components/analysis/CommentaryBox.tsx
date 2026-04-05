import CommentaryItem from './CommentaryItem'
import type { Commentary } from '@/types'

interface CommentaryBoxProps {
  items: Commentary[]
  isLoading?: boolean
}

export default function CommentaryBox({ items, isLoading }: CommentaryBoxProps) {
  if (isLoading) {
    return (
      <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Live Commentary</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-14 h-4 bg-white/5 rounded" />
              <div className="flex-1 h-4 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Live Commentary</h3>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No commentary yet. Check back when the market is open.
          </p>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto space-y-1">
          {items.map((item) => (
            <CommentaryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
