import { useState, useEffect } from 'react'
import type { Symbol } from '@/types'

export function useMarketStatus(symbol: Symbol) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkMarketStatus = () => {
      if (symbol === 'btcusd') {
        setIsOpen(true)
        return
      }

      const now = new Date()
      const istOffset = 5.5 * 60 * 60 * 1000
      const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000
      const ist = new Date(utc + istOffset)

      const hour = ist.getHours()
      const minute = ist.getMinutes()
      const day = ist.getDay()
      const timeInMinutes = hour * 60 + minute

      const isWeekday = day >= 1 && day <= 5
      const isDuringHours = timeInMinutes >= 555 && timeInMinutes < 930

      setIsOpen(isWeekday && isDuringHours)
    }

    checkMarketStatus()
    const interval = setInterval(checkMarketStatus, 60000)

    return () => clearInterval(interval)
  }, [symbol])

  return { isOpen }
}
