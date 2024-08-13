import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ExchangeRatesResponse } from '../models/exchange-rates-response.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly apiUrl: string = `${environment.apiUrl}${environment.apiKey}/latest/USD`;

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<ExchangeRatesResponse> {
    return this.http.get<ExchangeRatesResponse>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching exchange rates:', error);
        throw error;
      })
    );
  }

  getRatesToUAH(): Observable<{ USD: number; EUR: number }> {
    return this.getExchangeRates().pipe(
      map(data => ({
        USD: data.conversion_rates['UAH'] / data.conversion_rates['USD'],
        EUR: data.conversion_rates['UAH'] / data.conversion_rates['EUR']
      })),
      catchError(error => {
        console.error('Error fetching rates to UAH:', error);
        throw error;
      })
    );
  }
}
