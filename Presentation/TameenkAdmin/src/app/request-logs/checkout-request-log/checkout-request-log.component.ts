import * as FileSaver from 'file-saver';

import { Component, OnInit } from '@angular/core';

import { CheckoutRequestLogModel } from './checkout-request-log-model';
import { CommonResponse } from '../../core';
import { RequestLogsFilter } from '../request-Logs-filter';
import { RequestLogsService } from '../../core/services/requestLogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-request-log',
  templateUrl: './checkout-request-log.component.html',
  styleUrls: ['./checkout-request-log.component.css']
})
export class CheckoutRequestLogComponent implements OnInit {

  requestLogsFilter: RequestLogsFilter;
  checkoutRequestLogs: CheckoutRequestLogModel[];
  checkoutRequestLogsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit:boolean;
  today = new Date();
  isSearch = false;

  constructor(
    private _requestLogsService: RequestLogsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.requestLogsFilter = this._requestLogsService.requestLogsFilter;
    this.requestLogsFilter.startDate = this.today;
    this.requestLogsFilter.endDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = true;
    this.isEdit = false;
  }

  filterClick(e) {
    this.isSearch = true;
    e.reset();
  }

  checkoutRequestLogLazyLoad(event) {
    if (this.requestLogsFilter.startDate) {
      this.requestLogsFilter.startDate.setHours(
        this.requestLogsFilter.startDate.getHours() - this.requestLogsFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.requestLogsFilter.endDate) {
      this.requestLogsFilter.endDate.setHours(
        this.requestLogsFilter.endDate.getHours() - this.requestLogsFilter.endDate.getTimezoneOffset() / 60);
    }
    this._requestLogsService.getAllCheckoutRequestLogBasedOnFilter(this.requestLogsFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<CheckoutRequestLogModel[]>) => {
          this.checkoutRequestLogs = data.data;
          this.checkoutRequestLogsCount = data.totalCount;
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
        },
        (error: any) => {
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this.isSearch = true;
      if (this.requestLogsFilter.startDate) {
        this.requestLogsFilter.startDate.setHours(
          this.requestLogsFilter.startDate.getHours() - this.requestLogsFilter.startDate.getTimezoneOffset() / 60);
      }
      if (this.requestLogsFilter.endDate) {
        this.requestLogsFilter.endDate.setHours(
          this.requestLogsFilter.endDate.getHours() - this.requestLogsFilter.endDate.getTimezoneOffset() / 60);
      }
      this._requestLogsService.getCheckoutRequestLogExcelWithFilter(this.requestLogsFilter).subscribe((data) => {
        if (data.data) {
          console.log(data.data)

          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'checkout-requests-Log.xlsx');
        }
        this.loading = false;
        this.isSearch = false;
      }, (error: any) => {
        this.loading = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }

}
