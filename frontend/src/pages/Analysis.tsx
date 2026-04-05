import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import TradingViewChart from '@/components/analysis/TradingViewChart'
import CommentaryBox from '@/components/analysis/CommentaryBox'
import StatusBadge from '@/components/analysis/StatusBadge'
import Button from '@/components/ui/Button'
import { useMarketStatus } from '@/hooks/useMarketStatus'
import { useCommentary } from '@/hooks/useCommentary'
import { cn } from '@/lib/utils'
import type { Symbol } from '@/types'

const SYMBOLS: { id: Symbol; label: string }[] = [
  { id: 'nifty', label: 'NIFTY' },
  { id: 'btcusd', label: 'BTC/USD' },
]

export default function Analysis() {
  const { symbol: symbolParam } = useParams<{ symbol: string }>()
  const navigate = useNavigate()

  const symbol: Symbol = symbolParam === 'btcusd' ? 'btcusd' : 'nifty'

  const { isOpen } = useMarketStatus(symbol)
  const { items, isLoading } = useCommentary(symbol)

  const displayName = symbol === 'nifty' ? 'NIFTY' : 'BTC/USD'

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="text-gray-400 hover:text-purple transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <StatusBadge isLive={isOpen} />
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <TradingViewChart symbol={symbol} />
        </div>

        {/* Symbol Tabs */}
        <div className="flex gap-3 mb-8">
          {SYMBOLS.map((s) => (
            <Button
              key={s.id}
              variant={symbol === s.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => navigate(`/analysis/${s.id}`)}
              className={cn(
                symbol === s.id && 'shadow-lg shadow-purple/25'
              )}
            >
              {s.label}
            </Button>
          ))}
        </div>

        {/* Commentary */}
        <CommentaryBox items={items} isLoading={isLoading} />
      </div>
    </div>
  )
}
