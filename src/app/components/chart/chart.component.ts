import {AfterViewInit, Component, effect, ElementRef, HostListener, inject, input, ViewChild} from '@angular/core'
import {ChartDataItem} from '../../models/chart-data'
import {
  CandlestickData,
  CandlestickSeries,
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
  IChartApi,
  ISeriesApi
} from 'lightweight-charts'
import {DatePipe} from '@angular/common'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  providers: [DatePipe]
})
export class ChartComponent implements AfterViewInit {
  #datePipe = inject(DatePipe)

  chartData = input.required<ChartDataItem[] | null | undefined>()

  chart!: IChartApi
  candlestickSeries!: ISeriesApi<'Candlestick'>

  chartOptions: DeepPartial<ChartOptions> = {
    layout: {
      textColor: 'black',
      background: {type: ColorType.Solid, color: 'white'}
    }
  }

  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.#resizeChart()
  }

  constructor() {
    effect(() => {
      const chartData = this.chartData()
      if (chartData) {
        this.#setChartData(chartData)
      }
    })
  }

  ngAfterViewInit() {
    this.#buildChart()
  }

  #buildChart(): void {
    this.chart = createChart(this.chartContainer.nativeElement, this.chartOptions)
    this.candlestickSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    })
  }

  #setChartData(chartData: ChartDataItem[]): void {
    const data = chartData.map(({t, o, h, l, c}): CandlestickData => ({
      time: this.#datePipe.transform(t, 'yyyy-MM-dd')!,
      open: o,
      high: h,
      low: l,
      close: c
    }))
    this.candlestickSeries.setData(data)
    this.chart.timeScale().fitContent()
  }

  #resizeChart(): void {
    const width = this.chartContainer.nativeElement.clientWidth
    const height = this.chartContainer.nativeElement.clientHeight
    this.chart.resize(width, height)
  }
}
