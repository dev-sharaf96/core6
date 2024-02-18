import { Component, OnInit } from '@angular/core';
import {
  QuotationService,
  CommonResponse,
  IUserQuotationResponse,
  LocalizationService,
  AuthService } from 'src/app/core';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {
quotations: IUserQuotationResponse[];
totalCount: number;
loading = false;
  constructor(
    private _quotationService: QuotationService,
    private _localizationService: LocalizationService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getUserOffers();
  }
  getUserOffers(paging?) {
    this.loading = true;
    this._quotationService.getUserOffers(this._authService.getUserId(), paging)
    .subscribe((data: CommonResponse<IUserQuotationResponse[]>) => {
      this.loading = false;
      this.quotations = data.data;
      this.totalCount = data.totalCount;
      this.quotations.forEach(q => {
        q.logo = q.vehicle.vehicleMakerCode.toLocaleString('en', {minimumIntegerDigits: 4, useGrouping: false});
        q.city.description = this._localizationService.getCurrentLanguage().id === 2
        ? q.city.englishDescription
        : q.city.arabicDescription;
        if (q.remainingTimeToExpireInSeconds && q.remainingTimeToExpireInSeconds > 0) {
          const x = setInterval(function () {
            const distance = q.remainingTimeToExpireInSeconds -= 1,
              hours = Math.floor(distance / 3600),
              minutes = Math.floor(distance % 3600 / 60),
              seconds = Math.floor(distance % 3600 % 60);
            if (distance > 0) {
              if (hours > 0) {
                q.expiryTime = hours + ' : ' + minutes + ' : ' + seconds;
              } else {
                q.expiryTime = minutes + ' : ' + seconds;
              }
            } else {
              clearInterval(x);
              q.expiryTime = 'profile.quotation_expired';
            }
          }, 1000);
        }
      });
    },
    (error: any) => error);
  }
}
