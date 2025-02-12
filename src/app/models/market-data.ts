export interface MarketData {
  type: "l1-update",
  instrumentId: "ad9e5345-4c3b-41fc-9437-1d253f62db52",
  provider: "simulation",
  last: MarketDetails,
}

export interface MarketDetails {
  timestamp: string,
  price: number,
  volume: number,
  change: number,
  changePct: number
}
