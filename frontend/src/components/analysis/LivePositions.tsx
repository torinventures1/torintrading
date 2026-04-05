import { TrendingUp, TrendingDown } from 'lucide-react'

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

// Dummy positions data
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

export default function LivePositions() {
  const totalPnl = DUMMY_POSITIONS.reduce((sum, p) => sum + p.pnl, 0)
  const isProfit = totalPnl >= 0

  return (
    <div className="bg-black/40 rounded-2xl border border-purple/20 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
          Live Positions
        </h3>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-green-400 ml-1">LIVE</span>
        </div>
      </div>

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

      {/* Total P&L */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Total P&L</span>
          <div className="flex items-center gap-2">
            {isProfit ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span
              className={`text-lg font-bold ${
                isProfit ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isProfit ? '+' : ''}₹{totalPnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
