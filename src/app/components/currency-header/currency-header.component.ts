import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { firstValueFrom } from 'rxjs';

import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.scss']
})
export class CurrencyHeaderComponent implements OnInit {
  usdToUah: number = 0;
  eurToUah: number = 0;

  constructor(private currencyService: CurrencyService) {}

  async ngOnInit() {
    await this.loadExchangeRates();
  }

  async loadExchangeRates() {
    try {
      const rates = await firstValueFrom(this.currencyService.getRatesToUAH());
      this.usdToUah = rates.USD;
      this.eurToUah = rates.EUR;
    } catch (error) {
      console.error('Error loading exchange rates:', error);
    }
  }
}
