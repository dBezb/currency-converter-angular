import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  exchangeRates: { [key: string]: number } = {};

  currencies: string[] = ['UAH', 'USD', 'EUR'];

  constructor(private currencyService: CurrencyService) {}

  async ngOnInit() {
    await this.loadExchangeRates();
  }

  async loadExchangeRates() {
    try {
      const data = await this.currencyService.getExchangeRates();
      this.exchangeRates = data.conversion_rates;
      this.convertCurrency1(); 
    } catch (error) {
      console.error('Error loading exchange rates:', error);
    }
  }

  convertCurrency1() {
    const rate1 = this.exchangeRates[this.currency1];
    const rate2 = this.exchangeRates[this.currency2];
    
    if (rate1 && rate2) {
      this.amount2 = Number(((this.amount1 / rate1) * rate2).toFixed(2));
    }
  }

  convertCurrency2() {
    const rate1 = this.exchangeRates[this.currency1];
    const rate2 = this.exchangeRates[this.currency2];
    
    if (rate1 && rate2) {
      this.amount1 = Number(((this.amount2 / rate2) * rate1).toFixed(2));
    }
  }

  onCurrencyChange() {
    this.convertCurrency1();
  }
}
