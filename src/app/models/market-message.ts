export interface MarketMessage {
  type: string
  id: string
  instrumentId: string
  provider: string
  subscribe: boolean
  kinds: string | string[]
}
