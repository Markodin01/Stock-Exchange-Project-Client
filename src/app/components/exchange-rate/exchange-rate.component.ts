import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {
  currency!: string;
  date!: string;
  number!: number | null;
  averageRate!: number;
  minMax!: string;
  majorDiff!: Observable<number>;;
  numberFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(255)]);


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  // This function checks if a given date is a weekend day (Saturday or Sunday).
  // It returns true if it's not a weekend day, false otherwise.
  isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

  // This function sends an HTTP GET request to the NBP API to get the average exchange rate
  // for a given currency and date. It sets the 'averageRate' variable to the returned value.
  getExchangeRate() {
    this.apiService.getAverageExchangeRate(this.currency, this.date).subscribe((data: any) => {
      this.averageRate = data.rate;
    });
  }

  // This function sends an HTTP GET request to the NBP API to get the maximum and minimum exchange rates
  // for a given currency and number of records. It sets the 'minMax' variable to a string representation of
  // the maximum and minimum rates separated by a plus sign.
  getMinMax() {
    if (this.number !== null) {
      this.apiService.getMinMax(this.currency, this.number).subscribe((data: any) => {
        this.minMax = data.max + '+' + data.min
      });
    }
  }

  // This function sends an HTTP GET request to the NBP API to get the major difference between the exchange
  // rates for a given currency and number of records. It sets the 'majorDiff' variable to the returned value.
  getMajorDiff() {
    if (this.number !== null){
      this.apiService.getMajorDifference(this.currency, this.number).subscribe((data: any) => {
        this.majorDiff = data;
      });
    }
  }
  
}
