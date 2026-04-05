import { useEffect, useRef } from 'react'
import type { Symbol } from '@/types'

interface TradingViewChartProps {
  symbol: Symbol
}

declare global {
  interface Window {
    TradingView: {
      widget: new (config: Record<string, unknown>) => void
    }
  }
}

export default function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  const getTradingViewSymbol = (sym: Symbol): string => {
    return sym === 'nifty' ? 'NSE:NIFTY' : 'BINANCE:BTCUSDT'
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '<div id="tv-chart"></div>'
    }

    const initWidget = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          symbol: getTradingViewSymbol(symbol),
          container_id: 'tv-chart',
          autosize: true,
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#1a1a2e',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          backgroundColor: '#1a1a2e',
          gridColor: 'rgba(255, 255, 255, 0.05)',
        })
      }
    }

    if (window.TradingView) {
      initWidget()
    } else if (!scriptRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/tv.js'
      script.async = true
      script.onload = initWidget
      document.head.appendChild(script)
      scriptRef.current = script
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol])

  return (
    <div
      ref={containerRef}
      className="bg-dark-lighter rounded-xl border border-white/5 overflow-hidden"
      style={{ height: '400px' }}
    >
      <div id="tv-chart" className="w-full h-full" />
    </div>
  )
}
