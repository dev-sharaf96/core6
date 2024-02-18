import { Component, OnInit } from '@angular/core';
import { TicketLogFilter } from '../ticket-log-filter';
import { TicketLog } from '../ticket-log';
import { TicketServiceService } from '../../core/services/ticket-service.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService, CommonResponse } from '../../core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-ticket-log',
  templateUrl: './ticket-log.component.html',
  styleUrls: ['./ticket-log.component.css']
})
export class TicketLogComponent implements OnInit {
  logFilter: TicketLogFilter = new TicketLogFilter();
  logs: TicketLog[];
  logCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  selectedLog;

  constructor(
    private _ticketService: TicketServiceService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  filterClick(e) {
    // Set Timezone
    if (this.logFilter.fromDate) {
      this.logFilter.fromDate.setHours(
        this.logFilter.fromDate.getHours() - this.logFilter.fromDate.getTimezoneOffset() / 60);
    }
    if (this.logFilter.toDate) {
      this.logFilter.toDate.setHours(
        this.logFilter.toDate.getHours() - this.logFilter.toDate.getTimezoneOffset() / 60);
    }
    e.reset();
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const lang = (this.isEnglish) ? 'En' : 'Ar';
    this._ticketService.getAllLogsWithFilter(this.logFilter, `pageIndex=${event.first / event.rows}&pageSize=${event.rows}`
        ).subscribe((data: CommonResponse<TicketLog[]>) => {
          if (data.data.length > 0) {
            this.logs = data.data;
          } else {
            this.logs = [];
          }
          this.logCount = data.totalCount;
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

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      if (this.logFilter.fromDate) {
        this.logFilter.fromDate.setHours(
          this.logFilter.fromDate.getHours() - this.logFilter.fromDate.getTimezoneOffset() / 60);
      }
      if (this.logFilter.toDate) {
        this.logFilter.toDate.setHours(
          this.logFilter.toDate.getHours() - this.logFilter.toDate.getTimezoneOffset() / 60);
      }
      this._ticketService.getLogExcelWithFilter(this.logFilter).subscribe((data) => {
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

  showDetails(log: TicketLog) {
    this.selectedLog = log;
  }

}
