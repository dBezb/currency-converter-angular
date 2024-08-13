import { Component } from '@angular/core';
import { CurrencyHeaderComponent } from './components/currency-header/currency-header.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CurrencyHeaderComponent, CurrencyConverterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter-angular';
}
