import { useEffect, useRef, memo } from 'react'
import type { Symbol } from '@/types'

interface TradingViewChartProps {
  symbol: Symbol
}

const TradingViewChart = memo(function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const getTradingViewSymbol = (sym: Symbol): string => {
    // NIFTY 50 index - use TVC (TradingView Charts) exchange for indices
    return sym === 'nifty' ? 'TVC:NIFTY' : 'BINANCE:BTCUSDT'
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear previous widget
    container.innerHTML = ''

    // Create widget container
    const widgetContainer = document.createElement('div')
    widgetContainer.className = 'tradingview-widget-container'
    widgetContainer.style.height = '100%'
    widgetContainer.style.width = '100%'

    const widgetInner = document.createElement('div')
    widgetInner.className = 'tradingview-widget-container__widget'
    widgetInner.style.height = '100%'
    widgetInner.style.width = '100%'

    widgetContainer.appendChild(widgetInner)
    container.appendChild(widgetContainer)

    // Create and load the Advanced Chart widget script
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: getTradingViewSymbol(symbol),
      interval: '15',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      gridColor: 'rgba(128, 90, 213, 0.06)',
      hide_top_toolbar: false,
      hide_legend: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com',
    })

    widgetContainer.appendChild(script)

    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [symbol])

  return (
    <div
      ref={containerRef}
      className="rounded-2xl border border-purple/20 overflow-hidden bg-black"
      style={{ height: '500px' }}
    />
  )
})

export default TradingViewChart
