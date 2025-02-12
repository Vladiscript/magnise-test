export interface MarketInfo {
  symbol: string
  price: number
  timestamp: string
  status: 'idle' | 'loading' | 'success' | 'error'
}
