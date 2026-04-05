import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import TradingViewChart from '@/components/analysis/TradingViewChart'
import CommentaryBox from '@/components/analysis/CommentaryBox'
import StatusBadge from '@/components/analysis/StatusBadge'
import LivePositions from '@/components/analysis/LivePositions'
import QuantEngine from '@/components/analysis/QuantEngine'
import { useMarketStatus } from '@/hooks/useMarketStatus'
import { useCommentary } from '@/hooks/useCommentary'
import { cn } from '@/lib/utils'
import type { Symbol, Commentary } from '@/types'

const SYMBOLS: { id: Symbol; label: string }[] = [
  { id: 'nifty', label: 'NIFTY' },
  { id: 'btcusd', label: 'BTC/USD' },
]

// Dummy commentary for demo
const DUMMY_COMMENTARY: Commentary[] = [
  {
    id: 1,
    symbol: 'nifty',
    trade_type: 'long',
    message: 'Strong support at 22650. Entering long position on bounce.',
    price_level: 22658.50,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 2,
    symbol: 'nifty',
    trade_type: 'info',
    message: 'MACD crossover detected on 15m timeframe. Momentum shifting bullish.',
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 3,
    symbol: 'nifty',
    trade_type: 'target',
    message: 'First target reached. Moving SL to entry.',
    price_level: 22720.00,
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 4,
    symbol: 'nifty',
    trade_type: 'info',
    message: 'RSI approaching overbought on 5m. Watch for reversal signals near 22750.',
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 5,
    symbol: 'nifty',
    trade_type: 'short',
    message: 'Bearish engulfing on resistance. Scalp short initiated.',
    price_level: 22742.25,
    created_at: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
  },
  {
    id: 6,
    symbol: 'nifty',
    trade_type: 'exit',
    message: 'Exiting short on support test. Booking partial profits.',
    price_level: 22695.50,
    created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 7,
    symbol: 'nifty',
    trade_type: 'info',
    message: 'FII flow data shows net buyers today. Bias remains bullish above 22600.',
    created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 8,
    symbol: 'nifty',
    trade_type: 'long',
    message: 'Opening range breakout confirmed. Long with SL below 22580.',
    price_level: 22615.00,
    created_at: new Date(Date.now() - 1000 * 60 * 68).toISOString(),
  },
]

export default function Analysis() {
  const { symbol: symbolParam } = useParams<{ symbol: string }>()
  const navigate = useNavigate()

  const symbol: Symbol = symbolParam === 'btcusd' ? 'btcusd' : 'nifty'

  const { isOpen } = useMarketStatus(symbol)
  const { items: realItems, isLoading } = useCommentary(symbol)

  // Use dummy data if no real commentary
  const items = realItems.length > 0 ? realItems : DUMMY_COMMENTARY

  const displayName = symbol === 'nifty' ? 'NIFTY' : 'BTC/USD'

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with symbol tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-purple transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            {/* Symbol Tabs - Now in header */}
            <div className="flex items-center gap-2">
              {SYMBOLS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/analysis/${s.id}`)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2',
                    symbol === s.id
                      ? 'bg-purple/20 text-white border-purple shadow-lg shadow-purple/20'
                      : 'bg-white/[0.03] text-gray-400 border-transparent hover:text-white hover:border-purple/30'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <StatusBadge isLive={isOpen} />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Chart & Commentary */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Chart */}
            <TradingViewChart symbol={symbol} />

            {/* Commentary */}
            <CommentaryBox items={items} isLoading={isLoading} />
          </div>

          {/* Right Column - Positions & Quant Engine */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Live Positions */}
            <LivePositions />

            {/* Quant Engine */}
            <QuantEngine />
          </div>
        </div>
      </div>
    </div>
  )
}
