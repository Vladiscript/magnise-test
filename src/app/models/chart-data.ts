export interface ChartData {
  data: ChartDataItem[]
}

export interface ChartDataItem {
  t: string
  o: number
  h: number
  l: number
  c: number
  v: number
}
