import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Position {
  id: string
  symbol: string
  type: 'LONG' | 'SHORT'
  entry: number
  current: number
  qty: number
  pnl: number
  pnlPercent: number
}

interface ClosedTrade {
  id: string
  symbol: string
  type: 'LONG' | 'SHORT'
  entry: number
  exit: number
  qty: number
  pnl: number
  pnlPercent: number
  closedAt: string
}

// Dummy live positions data
const DUMMY_POSITIONS: Position[] = [
  {
    id: '1',
    symbol: 'NIFTY 24APR 22700 CE',
    type: 'LONG',
    entry: 185.50,
    current: 212.75,
    qty: 50,
    pnl: 1362.50,
    pnlPercent: 14.69,
  },
  {
    id: '2',
    symbol: 'NIFTY 24APR 22800 PE',
    type: 'SHORT',
    entry: 142.30,
    current: 128.45,
    qty: 25,
    pnl: 346.25,
    pnlPercent: 9.73,
  },
  {
    id: '3',
    symbol: 'BANKNIFTY FUT',
    type: 'LONG',
    entry: 48250.00,
    current: 48485.50,
    qty: 15,
    pnl: 3532.50,
    pnlPercent: 0.49,
  },
]

// Dummy closed trades data
const DUMMY_CLOSED: ClosedTrade[] = [
  {
    id: 'c1',
    symbol: 'NIFTY 22650 CE',
    type: 'LONG',
    entry: 145.00,
    exit: 178.50,
    qty: 50,
    pnl: 1675.00,
    pnlPercent: 23.10,
    closedAt: '14:32',
  },
  {
    id: 'c2',
    symbol: 'NIFTY 22700 PE',
    type: 'SHORT',
    entry: 98.25,
    exit: 112.40,
    qty: 25,
    pnl: -353.75,
    pnlPercent: -14.40,
    closedAt: '13:15',
  },
  {
    id: 'c3',
    symbol: 'BANKNIFTY 48500 CE',
    type: 'LONG',
    entry: 220.00,
    exit: 285.75,
    qty: 15,
    pnl: 986.25,
    pnlPercent: 29.89,
    closedAt: '11:45',
  },
  {
    id: 'c4',
    symbol: 'NIFTY 22600 PE',
    type: 'SHORT',
    entry: 165.50,
    exit: 142.25,
    qty: 50,
    pnl: 1162.50,
    pnlPercent: 14.05,
    closedAt: '10:22',
  },
]

type TabType = 'live' | 'closed'

export default function LivePositions() {
  const [activeTab, setActiveTab] = useState<TabType>('live')

  const totalLivePnl = DUMMY_POSITIONS.reduce((sum, p) => sum + p.pnl, 0)
  const totalClosedPnl = DUMMY_CLOSED.reduce((sum, t) => sum + t.pnl, 0)

  const isLiveProfit = totalLivePnl >= 0
  const isClosedProfit = totalClosedPnl >= 0

  return (
    <div className="bg-black/40 rounded-2xl border border-purple/20 p-4 backdrop-blur-sm">
      {/* Tab Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setActiveTab('live')}
          className={cn(
            'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all border-2',
            activeTab === 'live'
              ? 'bg-purple/20 text-white border-purple'
              : 'bg-white/[0.03] text-gray-400 border-transparent hover:text-white hover:border-purple/30'
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Live</span>
            {activeTab === 'live' && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab('closed')}
          className={cn(
            'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all border-2',
            activeTab === 'closed'
              ? 'bg-purple/20 text-white border-purple'
              : 'bg-white/[0.03] text-gray-400 border-transparent hover:text-white hover:border-purple/30'
          )}
        >
          Closed
        </button>
      </div>

      {/* Live Positions */}
      {activeTab === 'live' && (
        <>
          <div className="space-y-3">
            {DUMMY_POSITIONS.map((position) => (
              <div
                key={position.id}
                className="bg-white/[0.03] rounded-xl p-3 border border-white/5 hover:border-purple/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/90 truncate max-w-[140px]">
                    {position.symbol}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      position.type === 'LONG'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {position.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <span className="text-gray-400">{position.qty}</span> @ {position.entry.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1">
                    {position.pnl >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        position.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {position.pnl >= 0 ? '+' : ''}
                      {position.pnl.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs ${
                        position.pnl >= 0 ? 'text-green-400/60' : 'text-red-400/60'
                      }`}
                    >
                      ({position.pnlPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Live P&L */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total P&L</span>
              <div className="flex items-center gap-2">
                {isLiveProfit ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={`text-lg font-bold ${
                    isLiveProfit ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isLiveProfit ? '+' : ''}₹{totalLivePnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Closed Trades */}
      {activeTab === 'closed' && (
        <>
          <div className="space-y-3 max-h-[280px] overflow-y-auto">
            {DUMMY_CLOSED.map((trade) => (
              <div
                key={trade.id}
                className="bg-white/[0.03] rounded-xl p-3 border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/90 truncate max-w-[120px]">
                    {trade.symbol}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{trade.closedAt}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        trade.type === 'LONG'
                          ? 'bg-green-500/10 text-green-400/70 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400/70 border border-red-500/20'
                      }`}
                    >
                      {trade.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {trade.entry.toFixed(2)} → {trade.exit.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1">
                    {trade.pnl >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {trade.pnl >= 0 ? '+' : ''}
                      {trade.pnl.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Closed P&L */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Today's Realized</span>
              <div className="flex items-center gap-2">
                {isClosedProfit ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={`text-lg font-bold ${
                    isClosedProfit ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isClosedProfit ? '+' : ''}₹{totalClosedPnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
