import { AdminPolicyService, LocalizationService } from '../core/services';
import { Component, OnInit } from '@angular/core';

import { CommonResponse } from '../core';
import { RenewalDiscountFilterModel } from './Models/renewal-discount-filter-model';
import { RenewalDiscountModel } from './Models/renewal-discount-model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-renewal-discount',
  templateUrl: './renewal-discount.component.html',
  styleUrls: ['./renewal-discount.component.css']
})
export class RenewalDiscountComponent implements OnInit {
  discountFilterModel = new RenewalDiscountFilterModel();
  discount = new RenewalDiscountModel();
  discountList: RenewalDiscountModel[] = [];
  discountListCount;
  loading: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  openPpUp = false;
  clicked = false;
  isSearch = false;
  codeErrorDiv = false;
  codeErrorDivMessage = '';
  messageTypes;
  messageTypesAr = [
    { key: 1, value: "بعد 1 يوم" },
    { key: 2, value: "قبل 1 يوم" },
    { key: 3, value: "قبل 14 يوم" },
    { key: 4, value: "قبل 28 يوم" }
  ];
  messageTypesEn = [
    { key: 1, value: "After 1 Day" },
    { key: 2, value: "Before 1 Day" },
    { key: 3, value: "Before 14 Day" },
    { key: 4, value: "Before 28 Day" }
  ];
  discountTypes;
  discountTypesEn = [
    { key: 1, value: "By Value" },
    { key: 2, value: "By Percentage" }
  ];
  discountTypesAr = [
    { key: 1, value: "قيمة ثابتة" },
    { key: 2, value: "نسبة" }
  ];

  constructor(
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _policyService: AdminPolicyService,
    private _translate: TranslateService
    ) { }

  ngOnInit() {
     this.loading = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.messageTypes = this.isEnglish ? [...this.messageTypesEn] : [...this.messageTypesAr];
    this.discountTypes = this.isEnglish ? [...this.discountTypesEn] : [...this.discountTypesAr];
    this.discountFilterModel.lang = this.isEnglish ? 'en' : 'ar';
    this.discount.lang = this.isEnglish ? 'en' : 'ar';
    this.InitializeRenewalDiscountList();
    this.InitializeNewModel();
    this.loading = false;
  }

  filterClick(e) {
    this.isSearch = true;
    this.loading = true;
    if (this.discountFilterModel.startDate) {
      this.discountFilterModel.startDate.setHours(
        this.discountFilterModel.startDate.getHours() - this.discountFilterModel.startDate.getTimezoneOffset() / 60);
    }
    if (this.discountFilterModel.endDate) {
      this.discountFilterModel.endDate.setHours(
        this.discountFilterModel.endDate.getHours() - this.discountFilterModel.endDate.getTimezoneOffset() / 60);
    }
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows) + 1;
    const pageInSize = (event.rows);
    this.HandleInitializeingData(pageIndex, pageInSize);
  }

  HandleInitializeingData(pageIndex, pageInSize) {
    this._policyService.getRenewalDiscountsWithFilter(this.discountFilterModel, `pageIndex=${pageIndex}&pageInSize=${pageInSize}`).subscribe((data: CommonResponse<any>) => {
      this.discountList = [];
      this.discountListCount = 0;
      if (data.data.ErrorCode == 1) {
        this.discountList = data.data.Result;
        // this.discountList.forEach(item => {
        //   item.messageTypeText = (item.messageType) ? this.messageTypes[item.messageType].value : this.emptyStringValue;
        // });
        this.discountListCount = data.totalCount;
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

  // exportCsv() {
  //   if (!this.loading) {
  //     this.loading = true;
  //     this._policyService.getVehicleMakresExcel(this.makerFilter.makerCode, this.makerFilter.makerDescription).subscribe((data) => {
  //       if (data.data) {
  //         FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
  //          'requests-Log.xlsx');
  //       }
  //       this.loading = false;
  //     }, (error: any) => {
  //       this.loading = false;
  //       if (error.errors) {
  //         error.errors.forEach(item => {
  //           this._toastrService.error(item.code, item.description);
  //         });
  //       }
  //     });
  //   }
  // }

  showPopup() {
    this.InitializeNewModel();
    this.openPpUp = true;
  }

  closeModal() {
    this.openPpUp = false;
    this.clicked = false;
  }

  InitializeRenewalDiscountList() {
    this.HandleInitializeingData(1, 10);
    this.InitializeNewModel();
  }

  InitializeNewModel() {
    this.discount.id = 0;
    this.discount.code = null;
    this.discount.value = null;
    this.discount.percentage = null;
    this.discount.isActive = false;
    this.discount.startDate = this.today;
    this.discount.endDate = this.today;
    this.discount.messageType = this.messageTypes[0].key;
    this.discount.discountType = this.discountTypes[0].key;
    this.discount.codeType = 1;
  }

  changeDiscountType(e) {
    this.discount.discountType = +e.target.value;
  }

  restrictNumeric(e) {
    let input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  AddNew() {
    console.log('AddNew discount');
    console.log(this.discount);
    this.clicked = true;
    // this.discount.messageType = +this.discount.messageType;
    // this.discount.discountType = +this.discount.discountType;
    this._policyService.addNewRenewalDiscount(this.discount).subscribe((data: CommonResponse<any>) => {
      if (data.data.ErrorCode === 1) {
        this.InitializeRenewalDiscountList();
        this._toastrService.success(data.data.ErrorDescription);
      } else {
        this._toastrService.error(data.data.ErrorDescription);
      }
      this.codeErrorDivMessage = '';
      this.codeErrorDiv = false;
      this.closeModal();
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
        });
      }
      this.closeModal();
    });
  }

  ManageActivation(id, isActive) {
    this.loading = true;
    this.discount.id = id;
    this.discount.isActive = isActive;
    this._policyService.manageRenewalDiscountActivation(this.discount).subscribe((data: CommonResponse<any>) => {
      if (data.data.ErrorCode == 1) {
        this._translate.get('updateRequest.approved').subscribe(res => {
          this._toastrService.success(res);
        });

        this.InitializeRenewalDiscountList();
      } else {
        this._translate.get('updateRequest.rejected').subscribe(res => {
          this._toastrService.error(res);
        });
      }

      this.loading = false;
    }, (error: any) => {
      if (error.errors) {
        this.loading = false;
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  delete(id) {
    if(confirm('Are You Sure ?')) {
      this.loading = true;
      this.discount.id = id;
      this._policyService.deleteRenewalDiscount(this.discount).subscribe((data: CommonResponse<any>) => {
        if (data.data.ErrorCode == 1) {
          this._translate.get('common.deleteDone').subscribe(res => {
            this._toastrService.success(res);
          });

          this.InitializeRenewalDiscountList();
        } else {
          this._translate.get('common.deleteFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }

        this.loading = false;
      }, (error: any) => {
        if (error.errors) {
          this.loading = false;
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }
}
