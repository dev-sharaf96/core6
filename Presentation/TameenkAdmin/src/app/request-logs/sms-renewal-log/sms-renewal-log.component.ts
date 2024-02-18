import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { RequestLogsService } from "../../core/services/requestLogs.service";
import {
  AllTypeSMSRenewalLogModel,
  SMSRenewalCountsModel,
  SMSRenewalLogModel,
} from "./sms-renewal-log-model";
import { SMSRenewalLogFilter } from "./sms-renewal-log-filter";
import { CommonResponse } from "../../core/models/common.response.model";
import * as FileSaver from "file-saver";
import { LocalizationService } from "src/app/core";
import { Observable, Subject, Subscriber } from "rxjs";
import { forEach } from "@angular/router/src/utils/collection";
import * as XLSX from "xlsx";

@Component({
  selector: "app-sms-renewal-log",
  templateUrl: "./sms-renewal-log.component.html",
  styleUrls: ["./sms-renewal-log.component.css"],
})
export class SmsRenewalLogComponent implements OnInit {
  smsRenewalLogFilter: SMSRenewalLogFilter;
  smsRenewalLogs: SMSRenewalCountsModel[] = [];
  exportLst: SMSRenewalLogModel[] = [];
  smsLogsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  today = new Date();
  isSearch = false;

  constructor(
    private _requestLogsService: RequestLogsService,
    private _toastrService: ToastrService,
    // private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.smsRenewalLogFilter = this._requestLogsService.smsLogFilter;
    this.loading = true;
    this.firstTime = true;
  }

  filterClick(e) {
    this.isSearch = true;
    if (this.smsRenewalLogFilter.startDate) {
      this.smsRenewalLogFilter.startDate.setHours(
        this.smsRenewalLogFilter.startDate.getHours() -
          this.smsRenewalLogFilter.startDate.getTimezoneOffset() / 60
      );
    }
    if (this.smsRenewalLogFilter.endDate) {
      this.smsRenewalLogFilter.endDate.setHours(
        this.smsRenewalLogFilter.endDate.getHours() -
          this.smsRenewalLogFilter.endDate.getTimezoneOffset() / 60
      );
    }
    e.reset();
  }

  smsLogLazyLoad(event) {

    this.exportLst = [];
    this.smsRenewalLogs = [];
    this.smsLogsCount = [];

    this._requestLogsService.getAllSMSRenewalLogBasedOnFilter(this.smsRenewalLogFilter)
      .subscribe((data:any) => {
        if(!data.data){
          return;
        }

        const result = data.data as AllTypeSMSRenewalLogModel;
        for(let smsRenewaltype in result){
          result[smsRenewaltype].forEach((x:SMSRenewalLogModel) =>{
            const obj:SMSRenewalLogModel = new SMSRenewalLogModel(x);
            this.exportLst.push(obj);
          });
          this.smsRenewalLogs.push(new SMSRenewalCountsModel(smsRenewaltype,result[smsRenewaltype].length));
        }

        this.smsLogsCount = this.smsRenewalLogs.map(x=> x.count)
        .reduce(function(a, b)
        {
          return a + b;
        });

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

    try {
      if (!this.loading) {
        this.loading = true;
        this.isSearch = true;

      if (this.smsRenewalLogs.length > 0) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportLst);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, "sms-renewal-messages.xlsx");
      }
    }

    } finally {
      this.loading = false;
      this.isSearch = false;
    }
  }
}
