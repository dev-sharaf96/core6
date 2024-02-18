import { Component, Input, OnInit } from '@angular/core';
import { RequestLogsService } from '../../core/services/requestLogs.service';
import { CommonResponse } from '../../core/models/common.response.model';
import { AppNotificationLogFilter } from './models/app-notification-log-filter';
import { AppNotificationLogModel } from './models/app-notification-log-model';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { IIdNamePairModel, LocalizationService } from 'src/app/core';

@Component({
  selector: 'app-app-notifications',
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.css']
})
export class AppNotificationsComponent implements OnInit {
  filtermodel = new AppNotificationLogFilter();
  logsData: AppNotificationLogModel[];
  logsDataCount;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit: boolean;
  today = new Date();
  isSearch = false;
  @Input() selectedValue;
  channel: IIdNamePairModel = new IIdNamePairModel();
  channels: IIdNamePairModel[] = [
    {id: null, name: 'All'},
    {id: 3, name: 'Ios'},
    {id: 4, name: 'Android'},
  ];

  constructor(
    private _requestLogsService: RequestLogsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.firstTime = true;
    this.isEnglish = true;
    this.isEdit = false;
    this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
                    ? this.channels[0].name = 'All'
                    : this.channels[0].name = 'الكل';
    this.channel = this.channels[0];
    this.filtermodel.channel = null;
    this.filtermodel.export = false;
  }

  filterClick(e) {
    this.isSearch = true;
    this.HandleFilterationDateTimeBeforeSendRequest();
    e.reset();
  }

  dataLazyLoad(event) {
    if(this.channel) { this.filtermodel.channel = this.channel.id; }
    this._requestLogsService.getAllAppNotificationLogBasedOnFilter(this.filtermodel, `pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
      .subscribe((data: CommonResponse<any>) => {
          this.logsData = data.data.Result;
          this.logsDataCount = data.totalCount;
          this.firstTime = false;
          this.isSearch = false;
        },
        (error: any) => {
          this.firstTime = false;
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
    if(this.isSearch) { return; }
    this.isSearch = true;
      this.HandleFilterationDateTimeBeforeSendRequest();
      this.filtermodel.export = true;
      this._requestLogsService.getAppNotificationLogExcelWithFilter(this.filtermodel).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs(
            'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data.Result,
            'Log Data.xlsx');
        }
        this.isSearch = false;
      }, (error: any) => {
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach(item => { this._toastrService.error(item.code, item.description); });
        }
      });
  }

  HandleFilterationDateTimeBeforeSendRequest() {
    if (this.filtermodel.startDate) {
      this.filtermodel.startDate.setHours(
        this.filtermodel.startDate.getHours() - this.filtermodel.startDate.getTimezoneOffset() / 60);
    }
    if (this.filtermodel.endDate) {
      this.filtermodel.endDate.setHours(
        this.filtermodel.endDate.getHours() - this.filtermodel.endDate.getTimezoneOffset() / 60);
    }
  }

}
