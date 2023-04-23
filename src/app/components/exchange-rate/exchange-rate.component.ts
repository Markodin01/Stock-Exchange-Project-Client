import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { DateFilterFn } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {


  currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYW', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL'];
  selectedCurrency: string = '';
  date!: string;
  numberSelected!: number;
  averageRate!: number;
  minMax!: string;
  majorDiff!: Observable<number>;
  weekdayFilter: DateFilterFn<any> = (date: Date | null) => {
    if (!date) return false; // Return false if date is null or undefined
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Return true for all days except Saturday (0) and Sunday (6)
  };  
;
  numberFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(255)]);



  constructor(private apiService: ApiService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }


  // This function sends an HTTP GET request to the NBP API to get the average exchange rate
  // for a given currency and date. It sets the 'averageRate' variable to the returned value.
  getExchangeRate() {
    const formattedDate: string = this.datePipe.transform(this.date, 'yyyy-MM-dd') || '';
    this.apiService.getAverageExchangeRate(this.selectedCurrency, formattedDate).subscribe((data: any) => {
      this.averageRate = data.rate;
    });
  }

  // This function sends an HTTP GET request to the NBP API to get the maximum and minimum exchange rates
  // for a given currency and number of records. It sets the 'minMax' variable to a string representation of
  // the maximum and minimum rates separated by a plus sign.
  getMinMax() {
    if (this.numberSelected !== null) {
      this.apiService.getMinMax(this.selectedCurrency, this.numberSelected).subscribe((data: any) => {
        this.minMax = "Max: " + data.max + ' and Min: ' + data.min
      });
    }
  }

  // This function sends an HTTP GET request to the NBP API to get the major difference between the exchange
  // rates for a given currency and number of records. It sets the 'majorDiff' variable to the returned value.
  getMajorDiff() {
    if (this.numberSelected !== null){
      this.apiService.getMajorDifference(this.selectedCurrency, this.numberSelected).subscribe((data: any) => {
        this.majorDiff = data;
      });
    }
  }


}
