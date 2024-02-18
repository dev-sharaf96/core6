import { Component, OnInit } from '@angular/core';
import { PaymentsFilter } from './payments-filter';
import { Payment } from './payments-model';
import { LocalizationService, CommonResponse } from '../core';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from '../core/services/payments.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentsFilter: PaymentsFilter;
  payments: Payment[];
  paymentsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'ReferenceId';
  isEnglish: boolean;
  today = new Date();
  confirmReproccess = false;
  selectedPayment: Payment;
  constructor(
    private _paymentsService: PaymentsService,
    private _toastrService: ToastrService,
    private _translate: TranslateService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.paymentsFilter = this._paymentsService.paymentsFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? true
        : false;
  }
  confirm(payment: Payment) {
    this.selectedPayment = payment;
    this.confirmReproccess = true;
  }
  reproccess(ref) {
    this._paymentsService.reproccessFail(ref).subscribe(data => {
      this._translate.get('common.reproccess_success').subscribe(res => {
        this.confirmReproccess = false;
        this._toastrService.success(res);
      });
      this.paymentsLazyLoad(this.eventHolder);
    }, (error: any) => {
      this.firstTime = false;
      this.loading = false;
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  filterClick(e) {
    e.reset();
  }

  paymentsLazyLoad(event) {
    if (
      event.sortField === 'insuredFullNameAr' ||
      event.sortField === 'insuredFullNameEn'
    ) {
      this.payments = this.payments.sort((a, b) => {
        if (event.sortOrder === 1) {
          return a[event.sortField].localeCompare(b[event.sortField]);
        } else {
          return b[event.sortField].localeCompare(a[event.sortField]);
        }
      });
      return;
    }
    this.eventHolder = event;
    this.loading = true;
    this._paymentsService.getFailPaymentsWithFilter(this.paymentsFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<Payment[]>) => {
        this.payments = data.data;
        this.paymentsCount = data.totalCount;
        this.firstTime = false;
        this.loading = false;
      }, (error: any) => {
          this.firstTime = false;
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }
}
