import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestLogsService } from '../../core/services/requestLogs.service';
import { SMSLogModel } from './sms-log-model';
import { SMSLogFilter } from './sms-log-filter';
import { CommonResponse } from '../../core/models/common.response.model';
import * as FileSaver from 'file-saver';
import { Input, Output, EventEmitter } from '@angular/core';
import { LocalizationService, IIdNamePairModel } from 'src/app/core';
@Component({
  selector: 'app-sms-log',
  templateUrl: './sms-log.component.html',
  styleUrls: ['./sms-log.component.css']
})
export class SmsLogComponent implements OnInit {
  smsLogFilter: SMSLogFilter;
  smsLogs: SMSLogModel[];
  smsLogsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit: boolean;
  today = new Date();
  isSearch = false;
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  status: IIdNamePairModel[];
  stat: IIdNamePairModel = new IIdNamePairModel();
  statusAr: IIdNamePairModel[] = [
    {id: null, name: 'الكل'},
    {id: 1, name: 'STC'},
    {id: 2, name: 'MobiShastra'},
  ];
  statusEn: IIdNamePairModel[] = [
    {id: null, name: 'All'},
    {id: 1, name: 'STC'},
    {id: 2, name: 'MobiShastra'},
  ];
  constructor(
    private _requestLogsService: RequestLogsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.smsLogFilter = this._requestLogsService.smsLogFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = true;
    this.isEdit = false;
    this.status = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ?
    this.statusEn :
    this.statusAr;
  }
  dropchanged() {
    this.selectedValue = this.stat.id;
    this.smsLogFilter.smsprovider=this.stat.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
  filterClick(e) {
    this.isSearch = true;
    if (this.smsLogFilter.startDate) {
      this.smsLogFilter.startDate.setHours(
        this.smsLogFilter.startDate.getHours() - this.smsLogFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.smsLogFilter.endDate) {
      this.smsLogFilter.endDate.setHours(
        this.smsLogFilter.endDate.getHours() - this.smsLogFilter.endDate.getTimezoneOffset() / 60);
    }
    e.reset();
  }

  smsLogLazyLoad(event) {
    this._requestLogsService.getAllSMSLogBasedOnFilter(this.smsLogFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<SMSLogModel[]>) => {
          this.smsLogs = data.data;
          this.smsLogsCount = data.totalCount;
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
      if (this.smsLogFilter.startDate) {
        this.smsLogFilter.startDate.setHours(
          this.smsLogFilter.startDate.getHours() - this.smsLogFilter.startDate.getTimezoneOffset() / 60);
      }
      if (this.smsLogFilter.endDate) {
        this.smsLogFilter.endDate.setHours(
          this.smsLogFilter.endDate.getHours() - this.smsLogFilter.endDate.getTimezoneOffset() / 60);
      }
      this._requestLogsService.getSMSLogExcelWithFilter(this.smsLogFilter).subscribe((data) => {
        if (data.data) {
          console.log(data.data)

          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'requests-Log.xlsx');
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
