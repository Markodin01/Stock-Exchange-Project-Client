import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Set the base URL for the API
  private baseUrl = 'https://nbp-api.uhddbtuebceh6.eu-west-2.cs.amazonlightsail.com';

  constructor(private http: HttpClient) { }

  // Get the average exchange rate for a given currency and date
  getAverageExchangeRate(currency: string, date: string) {
    return this.http.get(`${this.baseUrl}/exchanges/${currency}/${date}`);
  }

  // Get the minimum and maximum exchange rates for a given currency and number of records
  getMinMax(currency: string, num_records: number) {
    return this.http.get(`${this.baseUrl}/exchanges/${currency}/max-min/${num_records}`);
  }

  // Get the records with the biggest differences in exchange rates for a given currency and number of records
  getMajorDifference(currency: string, num_records: number) {
    return this.http.get(`${this.baseUrl}/exchanges/${currency}/major-difference/${num_records}`);
  }
}
