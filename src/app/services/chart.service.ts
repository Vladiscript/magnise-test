import {inject, Injectable, signal} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable, of} from 'rxjs'
import {rxResource} from '@angular/core/rxjs-interop'
import {ChartData, ChartDataItem} from '../models/chart-data'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  #http = inject(HttpClient)

  #selectedInstrumentId = signal<string | null>(null)

  chartDataResource = rxResource({
    request: this.#selectedInstrumentId,
    loader: ({request: id}) => {
      if (!id) {
        return of(null)
      }
      return this.#getChartData(id)
    }
  })

  // #state = signal<ChartState>({
  //   data: [],
  //   status: 'idle'
  // })
  //
  // chartData = computed(() => this.#state().data)
  // status = computed(() => this.#state().status)
  //
  // #selectedInstrumentId$ = new Subject<string>()
  //
  // constructor() {
  //   this.#selectedInstrumentId$
  //     .pipe(
  //       switchMap((instrumentId) => this.#getChartData(instrumentId)),
  //       catchError(() => {
  //         this.#state.update((state) => ({...state, status: 'error'}))
  //         return of(null)
  //       }),
  //       takeUntilDestroyed()
  //     )
  //     .subscribe((chartData) => {
  //       if (chartData) {
  //         this.#state.update((state) => ({...state, data: chartData, status: 'success'}))
  //       }
  //     })
  // }

  selectInstrument(instrumentId: string): void {
    this.#selectedInstrumentId.set(instrumentId)
  }

  #getChartData(instrumentId: string): Observable<ChartDataItem[]> {
    return this.#http.get<ChartData>(environment.apiUri + `/api/bars/v1/bars/count-back?instrumentId=${instrumentId}&provider=oanda&interval=1&periodicity=day&barsCount=100`).pipe(
      map((data) => data.data)
    )
  }
}
