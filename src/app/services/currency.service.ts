import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = 'c25626a6b2c3999c09b99404';
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/USD`;

  constructor() { }

  async getExchangeRates(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw error;
    }
  }

  async getRatesToUAH(): Promise<{ USD: number; EUR: number }> {
    try {
      const data = await this.getExchangeRates();
      const eurToUah = data.conversion_rates['UAH'] / data.conversion_rates['EUR']; 
      const usdToUah = data.conversion_rates['UAH'] / data.conversion_rates['USD'];
      return {
        USD: usdToUah,
        EUR: eurToUah
      };
    } catch (error) {
      console.error('Error fetching rates to UAH:', error);
      throw error;
    }
  }
}
