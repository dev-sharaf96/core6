import { Component, OnInit } from '@angular/core';
import { RequestLogsFilter } from '../request-Logs-filter';
import { QuotationRequestLogModel } from './quotation-request-log-model';
import { RequestLogsService } from 'src/app/core/services/requestLogs.service';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/core/models/common.response.model';

@Component({
  selector: 'app-quotation-request-log',
  templateUrl: './quotation-request-log.component.html',
  styleUrls: ['./quotation-request-log.component.css']
})
export class QuotationRequestLogComponent implements OnInit {

  requestLogsFilter: RequestLogsFilter;
  quotationRequestLogs: QuotationRequestLogModel[];
  quotationRequestLogsCount;
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

  quotationRequestLogLazyLoad(event) {
    if (this.requestLogsFilter.startDate) {
      this.requestLogsFilter.startDate.setHours(
        this.requestLogsFilter.startDate.getHours() - this.requestLogsFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.requestLogsFilter.endDate) {
      this.requestLogsFilter.endDate.setHours(
        this.requestLogsFilter.endDate.getHours() - this.requestLogsFilter.endDate.getTimezoneOffset() / 60);
    }

    this._requestLogsService.getAllQuotationRequestLogBasedOnFilter(this.requestLogsFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<QuotationRequestLogModel[]>) => {
          this.quotationRequestLogs = data.data;
          this.quotationRequestLogsCount = data.totalCount;
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
