import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../requests/requests.model';
import { RequestsFilter } from '../requests/requests-filter.model';
import { LocalizationService, CommonResponse } from '../core';
import { ToastrService } from 'ngx-toastr';
import { RequestsService } from '../core/services/requests.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  requestsFilter: RequestsFilter;
  requests: RequestModel[];
  requestsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = '';
  isEnglish: boolean;
  today = new Date();
  selectedRequest;
  constructor(
    private _requestsService: RequestsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.requestsFilter = this._requestsService.requestsFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? true
        : false;
  }
  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      if (this.requestsFilter.startDate) {
        this.requestsFilter.startDate.setHours(
          this.requestsFilter.startDate.getHours() - this.requestsFilter.startDate.getTimezoneOffset() / 60);
      }
      if (this.requestsFilter.endDate) {
        this.requestsFilter.endDate.setHours(
          this.requestsFilter.endDate.getHours() - this.requestsFilter.endDate.getTimezoneOffset() / 60);
      }
      this._requestsService.getServicesRequestExcelWithFilterNew(this.requestsFilter).subscribe((data) => {
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
  showDetails(request: RequestModel) {
    this.selectedRequest = request;
  }
  filterClick(e) {
    // Set Timezone
    if (this.requestsFilter.startDate) {
      this.requestsFilter.startDate.setHours(
        this.requestsFilter.startDate.getHours() - this.requestsFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.requestsFilter.endDate) {
      this.requestsFilter.endDate.setHours(
        this.requestsFilter.endDate.getHours() - this.requestsFilter.endDate.getTimezoneOffset() / 60);
    }
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._requestsService.getAllServicesRequestWithFilterNew(this.requestsFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
        event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`
        ).subscribe((data: CommonResponse<RequestModel[]>) => {
          if (data.data.length > 0) {
            this.requests = data.data;
          } else {
            this.requests = [];
          }
          this.requestsCount = data.totalCount;
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
        });
  }
}
