import {Component, input, output, signal} from '@angular/core'
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select'
import {MatButton} from '@angular/material/button'
import {Instrument} from '../../models/instruments'
import {FormControl, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-assets-selector',
  imports: [
    MatSelect,
    MatButton,
    MatOption,
    MatLabel,
    MatFormField,
    ReactiveFormsModule
  ],
  templateUrl: './assets-selector.component.html',
  styleUrl: './assets-selector.component.scss'
})
export class AssetsSelectorComponent {
  instrumentsList = input.required<Instrument[]>()
  subscribe = output<{ id: string, symbol: string }>()

  instrumentControl = new FormControl<Instrument | null>(null)
  selectedId = signal('')

  onSubscribe(): void {
    const instrument = this.instrumentControl.getRawValue()
    if (!instrument || instrument?.id === this.selectedId()) return

    this.selectedId.set(instrument.id)
    const {id, symbol} = instrument
    this.subscribe.emit({id, symbol})
  }
}
