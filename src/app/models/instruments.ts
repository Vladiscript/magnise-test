export interface InstrumentsData {
  paging: {
    page: number
    pages: number
    items: number
  },
  data: Instrument[]
}

export interface Instrument {
  id: string
  symbol: string
  kind: string
  description: string
  tickSize: number
  currency: string
  baseCurrency: string
  mappings: unknown
  profile: unknown
}
