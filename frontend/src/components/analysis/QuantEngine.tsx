import { useEffect, useState, useRef } from 'react'
import { Activity, Cpu, Zap, BarChart3 } from 'lucide-react'

interface MetricData {
  label: string
  value: string
  color: string
}

interface StreamData {
  id: number
  value: string
}

export default function QuantEngine() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    { label: 'Volatility σ', value: '0.0234', color: 'text-cyan-400' },
    { label: 'Delta Δ', value: '0.6821', color: 'text-purple-400' },
    { label: 'Gamma Γ', value: '0.0089', color: 'text-pink-400' },
    { label: 'Theta Θ', value: '-0.0156', color: 'text-yellow-400' },
  ])

  const [streamData, setStreamData] = useState<StreamData[]>([])
  const [cpuLoad, setCpuLoad] = useState(67)
  const [modelConfidence, setModelConfidence] = useState(87.3)
  const streamIdRef = useRef(0)

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: (parseFloat(m.value) + (Math.random() - 0.5) * 0.01).toFixed(4),
        }))
      )
      setCpuLoad(Math.min(99, Math.max(45, cpuLoad + (Math.random() - 0.5) * 10)))
      setModelConfidence(Math.min(99, Math.max(75, modelConfidence + (Math.random() - 0.5) * 3)))
    }, 800)

    return () => clearInterval(interval)
  }, [cpuLoad, modelConfidence])

  // Simulate data stream
  useEffect(() => {
    const interval = setInterval(() => {
      const newData: StreamData = {
        id: streamIdRef.current++,
        value: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
      }
      setStreamData((prev) => [...prev.slice(-8), newData])
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black/40 rounded-2xl border border-purple/20 p-4 backdrop-blur-sm overflow-hidden">
      {/* Header - Subtle indicator only */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <span className="text-xs text-gray-500">Signal Analysis</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400/80">Active</span>
        </div>
      </div>

      {/* CPU & Model Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white/[0.03] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-500 uppercase">CPU Load</span>
            <Zap className="w-3 h-3 text-yellow-400" />
          </div>
          <div className="flex items-end gap-1">
            <span className="text-lg font-bold text-yellow-400">{cpuLoad.toFixed(0)}</span>
            <span className="text-xs text-gray-500 mb-0.5">%</span>
          </div>
          <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300"
              style={{ width: `${cpuLoad}%` }}
            />
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-500 uppercase">Confidence</span>
            <BarChart3 className="w-3 h-3 text-green-400" />
          </div>
          <div className="flex items-end gap-1">
            <span className="text-lg font-bold text-green-400">{modelConfidence.toFixed(1)}</span>
            <span className="text-xs text-gray-500 mb-0.5">%</span>
          </div>
          <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${modelConfidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Greeks/Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-white/[0.02] rounded-lg px-2 py-1.5 border border-white/5"
          >
            <span className="text-[10px] text-gray-500 block">{metric.label}</span>
            <span className={`text-sm font-mono font-semibold ${metric.color}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Data Stream Visualization */}
      <div className="bg-black/60 rounded-lg p-2 border border-purple/10 font-mono text-[10px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-400">&gt;_</span>
          <span className="text-gray-500">SIGNAL_STREAM</span>
          <span className="flex-1" />
          <span className="text-green-400 animate-pulse">●</span>
        </div>
        <div className="h-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
          <div className="space-y-0.5">
            {streamData.map((data, i) => (
              <div
                key={data.id}
                className="flex items-center gap-2 text-gray-400 animate-fade-in"
                style={{ opacity: 0.3 + (i / streamData.length) * 0.7 }}
              >
                <span className="text-purple-500">[{String(i).padStart(3, '0')}]</span>
                <span className="text-cyan-400">{data.value}</span>
                <span className="text-gray-600">|</span>
                <span className="text-green-400/80">
                  {(Math.random() * 100).toFixed(2)}
                </span>
                <span className="text-yellow-500/60">
                  → {['BUY', 'HOLD', 'SELL', 'WAIT'][Math.floor(Math.random() * 4)]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500">
        <span>Model: LSTM-ATT-v3.2</span>
        <span>Latency: {(Math.random() * 5 + 2).toFixed(1)}ms</span>
      </div>
    </div>
  )
}
