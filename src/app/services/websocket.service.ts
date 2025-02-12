import {computed, inject, Injectable} from '@angular/core'
import {webSocket} from 'rxjs/webSocket'
import {AuthService} from "./auth.service"
import {environment} from "../../environments/environment"
import {MarketData} from "../models/market-data"
import {MarketService} from "./market.service"
import {filter, map, Subscription} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  #authService = inject(AuthService)
  #marketService = inject(MarketService)

  #wsUri = computed(() => environment.wsUri + `?token=${this.#authService.accessToken()}`)
  #webSocket$ = webSocket(this.#wsUri())
  #wsSubscription?: Subscription

  subscribeToMarket(instrumentId: string, symbol: string): void {
    this.#wsSubscription?.unsubscribe()
    const message = {
      type: 'l1-subscription',
      id: '1',
      instrumentId,
      provider: 'simulation',
      subscribe: true,
      kinds: ['last']
    }
    this.#marketService.updateMarketInfo({symbol, status: 'loading'})
    this.#webSocket$.next(message)
    this.#trackMarketInfo()
  }

  #trackMarketInfo(): void {
    this.#wsSubscription = this.#webSocket$
      .pipe(
        filter(msg => this.#isMarketData(msg)),
        map(msg => msg.last),
      )
      .subscribe({
        next: (marketDetails) => {
          const {price, timestamp} = marketDetails
          this.#marketService.updateMarketInfo({price, timestamp, status: 'success'})
        },
        error: (err) => {
          console.error(err)
          this.#marketService.updateMarketInfo({status: 'error'})
        }
      })

  }

  #isMarketData(msg: any): msg is MarketData {
    return msg && typeof msg === 'object' && 'instrumentId' in msg && 'last' in msg
  }
}
