import { Component, OnInit } from '@angular/core';
import { RequestLogsFilter } from '../request-Logs-filter';
import { InquiryRequestLogModel } from './inquiry-request-log-model';
import { RequestLogsService } from 'src/app/core/services/requestLogs.service';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-inquiry-request-log',
  templateUrl: './inquiry-request-log.component.html',
  styleUrls: ['./inquiry-request-log.component.css']
})
export class InquiryRequestLogComponent implements OnInit {

  requestLogsFilter: RequestLogsFilter;
  inquiryRequestLogs: InquiryRequestLogModel[];
  inquiryRequestLogsCount;
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

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      if (this.requestLogsFilter.startDate) {
        this.requestLogsFilter.startDate.setHours(
          this.requestLogsFilter.startDate.getHours() - this.requestLogsFilter.startDate.getTimezoneOffset() / 60);
      }
      if (this.requestLogsFilter.endDate) {
        this.requestLogsFilter.endDate.setHours(
          this.requestLogsFilter.endDate.getHours() - this.requestLogsFilter.endDate.getTimezoneOffset() / 60);
      }
      this._requestLogsService.getInquiryRequestLogExcel(this.requestLogsFilter).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'requests-Log.xlsx');
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }

  inquiryRequestLogLazyLoad(event) {
    if (this.requestLogsFilter.startDate) {
      this.requestLogsFilter.startDate.setHours(
        this.requestLogsFilter.startDate.getHours() - this.requestLogsFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.requestLogsFilter.endDate) {
      this.requestLogsFilter.endDate.setHours(
        this.requestLogsFilter.endDate.getHours() - this.requestLogsFilter.endDate.getTimezoneOffset() / 60);
    }

    this._requestLogsService.getAllInquiryRequestLogBasedOnFilter(this.requestLogsFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<InquiryRequestLogModel[]>) => {
          this.inquiryRequestLogs = data.data;
          this.inquiryRequestLogsCount = data.totalCount;
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
}
