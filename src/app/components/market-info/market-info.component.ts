import {Component, computed, inject, input} from '@angular/core'
import {MarketInfo} from '../../models/market-info'
import {CurrencyPipe, DatePipe} from '@angular/common'

@Component({
  selector: 'app-market-info',
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './market-info.component.html',
  styleUrl: './market-info.component.scss'
})
export class MarketInfoComponent {
  marketInfo = input.required<MarketInfo>()

  #currencyPipe = inject(CurrencyPipe)
  #datePipe = inject(DatePipe)

  symbol = computed(() => this.marketInfo().symbol || '-')
  price = computed(() => this.marketInfo().price ? this.#currencyPipe.transform(this.marketInfo().price, 'USD', 'symbol', '1.4-4') : '-')
  time = computed(() => this.#datePipe.transform(this.marketInfo().timestamp, 'MMM d, h:mm:ss a') || '-')
  status = computed(() => this.marketInfo().status)
}
