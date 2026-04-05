export type TradeType = 'long' | 'short' | 'info' | 'target' | 'exit'

export interface Commentary {
  id: number
  symbol: string
  message: string
  trade_type: TradeType
  price_level?: number
  created_at: string
}

export interface MarketStatus {
  isOpen: boolean
  nextOpen?: string
  nextClose?: string
}

export type Symbol = 'nifty' | 'btcusd'
