import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/core/models';
import { AdminPolicyService, LocalizationService } from 'src/app/core/services';
import { WithdrawalFilterModel } from './Models/withdrawal-filter-model';
import { WithdrawalListingModel } from './Models/withdrawal-listing-model';
import { WithdrawalStatisticsModel } from './Models/WithdrawalStatisticsModel';

@Component({
  selector: 'app-bcare-withdrawal',
  templateUrl: './bcare-withdrawal.component.html',
  styleUrls: ['./bcare-withdrawal.component.css']
})
export class BCareWithdrawalComponent implements OnInit {
  filterModel = new WithdrawalFilterModel();
  dataList: WithdrawalListingModel[] = [];
  statisticsModel = new WithdrawalStatisticsModel();
  dataListCount;
  isEnglish: boolean;
  isSearch = false;
  loading: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  showSelectProductTyperError: boolean = false;
  selectProductTyperErrorDesc: string = '';
  showPrizePopup: boolean = false;
  productsTypes;
  productsTypesAr = [
    { key: 0, value: "اختر من فضلك" },
    { key: 1, value: "تأمين مركبات طرف ثالث (ضد الغير)" },
    { key: 2, value: "تأمين مركبات شامل" },
    // { key: 3, value: "تسجيل" }
  ];
  productsTypesEn = [
    { key: 0, value: "Please Select" },
    { key: 1, value: "Third-Party Vehicle Insurance" },
    { key: 2, value: "Comprehensive Vehicle Insurance" },
    // { key: 3, value: "Register" }
  ];

  weeks;
  weeksAr = [
    { key: 1, value: "الإسبوع الأول" },
    { key: 2, value: "الإسبوع الثانى" },
    { key: 3, value: "الإسبوع الثالث" },
    { key: 4, value: "الإسبوع الرابع" },
    { key: 5, value: "الإسبوع الخامس" },
    { key: 6, value: "الإسبوع السادس" },
    { key: 7, value: "الإسبوع السابع" },
    { key: 8, value: "الإسبوع الثامن" }
  ];
  weeksEn = [
    { key: 1, value: "Week 1" },
    { key: 2, value: "Week 2" },
    { key: 3, value: "Week 3" },
    { key: 4, value: "Week 4" },
    { key: 5, value: "Week 5" },
    { key: 6, value: "Week 6" },
    { key: 7, value: "Week 7" },
    { key: 8, value: "Week 8" }
  ];

  prizeTypes;
  // prizeTypesAr = [
  //   { key: 0, value: "اختر من فضلك", week: [1, 2, 3, 4, 5, 6, 7, 8] },
  //   { key: 1, value: "1000 ريال نقدى", week: [1, 2, 3, 4, 5, 6, 7] },
  //   { key: 2, value: "جوال ايفون", week: [1, 2, 3, 4, 5, 6, 7] },
  //   { key: 2, value: "ساعة", week: [8] },
  //   { key: 2, value: "سيارة", week: [8] },
  // ];
  // prizeTypesEn = [
  //   { key: 0, value: "Please Select", week: [1, 2, 3, 4, 5, 6, 7, 8] },
  //   { key: 1, value: "1000 SAR Cash", week: [1, 2, 3, 4, 5, 6, 7] },
  //   { key: 2, value: "Iphone", week: [1, 2, 3, 4, 5, 6, 7] },
  //   { key: 2, value: "Watch", week: [8] },
  //   { key: 2, value: "Car", week: [8] },
  // ];
  prizeTypesAr = [
    // { key: 0, value: "اختر من فضلك", week: [1, 2, 3, 4, 5, 6, 7, 8] },
    { key: 1, value: "BMW 520i", week: [1, 2, 3, 4, 5, 6, 7] },
    // { key: 2, value: "10,000 ريال نقدى", week: [1, 2, 3, 4, 5, 6, 7] },
    // { key: 3, value: "30,000 ريال نقدى", week: [1, 2, 3, 4, 5, 6, 7] },
  ];
  prizeTypesEn = [
    // { key: 0, value: "Please Select", week: [1, 2, 3, 4, 5, 6, 7, 8] },
    { key: 1, value: "BMW 520i", week: [1, 2, 3, 4, 5, 6, 7] },
    // { key: 2, value: "10,000 SAR Cash", week: [1, 2, 3, 4, 5, 6, 7] },
    // { key: 3, value: "30,000 SAR Cash", week: [1, 2, 3, 4, 5, 6, 7] },
  ];

  winnersCount = [
    { key: 1 },
    // { key: 4 },
    // { key: 5 },
    // { key: 10 }
  ];

  constructor(private _policyService: AdminPolicyService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    // this.handleWeekNumber();
    this.getCompitionStatistics();
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en" ? true : false;
    this.productsTypes = this.isEnglish ? this.productsTypesEn : this.productsTypesAr;
    // this.prizeTypes = this.isEnglish ? this.prizeTypesEn.filter(a => a.week.includes(this.filterModel.weekNumber)) : this.prizeTypesAr.filter(a => a.week.includes(this.filterModel.weekNumber));
    this.prizeTypes = this.isEnglish ? this.prizeTypesEn : this.prizeTypesAr;
    this.weeks = this.isEnglish ? this.weeksEn : this.weeksAr;
    this.filterModel.lang = this.isEnglish ? 'en' : 'ar';
    this.filterModel.productType = 0;
    this.filterModel.prizeNumber = 1; //0;
    this.filterModel.returnedNumber = 1;
  }

  filterClick(e) {
    if (this.filterModel.productType == 0) {
      this.showSelectProductTyperError = true;
      this.selectProductTyperErrorDesc = this.isEnglish ? 'Please Select Product Type' : 'من فضلك اختر نوع المنتج';
      return;
    }
    if (this.filterModel.prizeNumber == 0) {
      this.showSelectProductTyperError = true;
      this.selectProductTyperErrorDesc = this.isEnglish ? 'Please Select Prize Type' : 'من فضلك اختر نوع الجائزة';
      return;
    }

    this.showSelectProductTyperError = false;
    this.selectProductTyperErrorDesc = '';
    this.isSearch = true;
    this.loading = true;
    e.reset();
  }

  requestsLazyLoad(event) {
    this.filterModel.productType = +this.filterModel.productType;
    this.filterModel.prizeNumber = +this.filterModel.prizeNumber;
    this.filterModel.weekNumber = 0;
    this._policyService.getBcareWithdrawalWithFilter(this.filterModel).subscribe((data: CommonResponse<any>) => {
      this.dataList = [];
      this.dataListCount = 0;
      if (data.data.ErrorCode == 1) {
        this.dataList = data.data.Result;
        this.dataListCount = data.totalCount;
      } else {
        this._toastrService.error(data.data.ErrorCode, data.data.ErrorDescription);
      }

      this.isSearch = false;
      this.loading = false;
      this.showPrizePopup = false;
    }, (error: any) => {
      this.isSearch = false;
      this.loading = false;
      this.showPrizePopup = false;
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  getCompitionStatistics() {
    this.isSearch = true;
    this.loading = true;
    this._policyService.getCompitionStatistics(this.isEnglish ? 'en' : 'ar').subscribe((data: CommonResponse<any>) => {
      if (data.data.ErrorCode == 1) {
        this.statisticsModel = data.data.Result;
      } else {
        this._toastrService.error(data.data.ErrorCode, data.data.ErrorDescription);
      }

      this.isSearch = false;
      this.loading = false;
    }, (error: any) => {
      this.isSearch = false;
      this.loading = false;
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  handleWeekNumber() {
    let date = new Date().getTime();
    if ((new Date("2022/3/17 00:00:00").getTime() <= date) && (date < new Date("2022/3/23 23:59:59").getTime())) {
      this.filterModel.weekNumber = 1;
    } else if ((new Date("2022/3/24 00:00:00").getTime() <= date) && (date <= new Date("2022/3/30 23:59:59").getTime())) {
      this.filterModel.weekNumber = 2;
    } else if ((new Date("2022/3/31 00:00:00").getTime() <= date) && (date <= new Date("2022/4/6 23:59:59").getTime())) {
      this.filterModel.weekNumber = 3;
    } else if ((new Date("2022/4/7 00:00:00").getTime() <= date) && (date <= new Date("2022/4/13 23:59:59").getTime())) {
      this.filterModel.weekNumber = 4;
    } else if ((new Date("2022/4/14 00:00:00").getTime() <= date) && (date <= new Date("2022/4/20 23:59:59").getTime())) {
      this.filterModel.weekNumber = 5;
    } else if ((new Date("2022/4/21 00:00:00").getTime() <= date) && (date <= new Date("2022/4/27 23:59:59").getTime())) {
      this.filterModel.weekNumber = 6;
    } else if ((new Date("2022/5/5 00:00:00").getTime() <= date) && (date <= new Date("2022/5/11 23:59:59").getTime())) {
      this.filterModel.weekNumber = 7;
    } else if ((new Date("2022/5/12 00:00:00").getTime() <= date) && (date <= new Date("2022/5/18 23:59:59").getTime())) {
      this.filterModel.weekNumber = 8;
    }
  }
}