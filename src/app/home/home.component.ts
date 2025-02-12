import {Component, inject} from '@angular/core'
import {AssetsSelectorComponent} from '../components/assets-selector/assets-selector.component'
import {MarketInfoComponent} from '../components/market-info/market-info.component'
import {MarketService} from '../services/market.service'
import {WebSocketService} from '../services/websocket.service'
import {ChartComponent} from '../components/chart/chart.component'
import {ChartService} from '../services/chart.service'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import {toSignal} from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-home',
  imports: [
    AssetsSelectorComponent,
    MarketInfoComponent,
    ChartComponent,
    MatProgressSpinner,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  #marketService = inject(MarketService)
  #chartService = inject(ChartService)
  #ws = inject(WebSocketService)

  instruments = toSignal(this.#marketService.getInstruments(), {initialValue: []})
  marketInfo = this.#marketService.marketInfo
  chartData = this.#chartService.chartDataResource

  subscribeToMarket({id, symbol}: { id: string, symbol: string }): void {
    this.#ws.subscribeToMarket(id, symbol)
    this.#chartService.selectInstrument(id)
  }
}
