import {inject, Injectable, signal} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Instrument, InstrumentsData} from '../models/instruments'
import {environment} from '../../environments/environment'
import {map, Observable} from 'rxjs'
import {MarketInfo} from '../models/market-info'

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  #http = inject(HttpClient)

  marketInfo = signal<MarketInfo>({
    symbol: '',
    price: 0,
    timestamp: '',
    status: 'idle'
  })

  updateMarketInfo(payload: Partial<MarketInfo>): void {
    this.marketInfo.update(state => ({...state, ...payload}))
  }

  getInstruments(): Observable<Instrument[]> {
    return this.#http.get<InstrumentsData>(environment.apiUri + '/api/instruments/v1/instruments?provider=oanda&kind=forex').pipe(
      map((data) => data.data)
    )
  }
}
