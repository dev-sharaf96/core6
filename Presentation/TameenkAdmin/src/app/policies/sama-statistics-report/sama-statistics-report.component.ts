import * as FileServer from "file-saver";

import {
  AdminPolicyService,
  CheckoutsService,
  CommonResponse,
  LocalizationService,
} from "src/app/core";
import { Component, OnInit } from '@angular/core';

import { AgeRanges } from './SamaStatistcsModel/AgeRanges';
import { Channels } from './SamaStatistcsModel/Channel';
import { PaymentMethod } from './SamaStatistcsModel/PaymentMethod';
import { ToastrService } from "ngx-toastr";
import { TotalPolicesPerGender } from './SamaStatistcsModel/TotalPolicesPerGender';
import { samaMegaReportFilter } from './samaMegaReportFilter';
import { samaResponseModel } from './SamaStatistcsModel/samaResponseModel';
import { totalInSystem } from './SamaStatistcsModel/totalInSystem';
import { totalPolicesPerCity } from "./SamaStatistcsModel/totalPolicesPerCity";

@Component({
  selector: 'app-sama-statistics-report',
  templateUrl: './sama-statistics-report.component.html',
  styleUrls: ['./sama-statistics-report.component.css']
})
export class SamaStatisticsReportComponent implements OnInit {

  requestsFilter: samaMegaReportFilter;
  totalPolicesGenderModel?: TotalPolicesPerGender[] = [];
  allAgeRanges?: AgeRanges[];
  allPaymentMethodModel?: PaymentMethod[];
  totalInSystem?: totalInSystem[];
  allChannelModel?: Channels[];
  totalIndividualPolicesPerCity?: totalPolicesPerCity[];
  totalCorporatePolicesPerCity?: totalPolicesPerCity[];
  requests: samaResponseModel[];
  requestsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  defaultSortField = "";
  isEnglish: boolean;
  today = new Date();
  selectedRequest;
  startDate: Date = new Date();
  endDate: Date = new Date();
  isSearch = false;
  constructor(
    private _requestsService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    // this.requestsFilter.StatusCode = null;
    this.requestsFilter = new samaMegaReportFilter();
    console.log(this.requestsFilter);
    this.requestsFilter.StartDate = this.startDate.toLocaleDateString("en-US");
    this.requestsFilter.EndDate = this.endDate.toLocaleDateString("en-US");
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;
  }

  exportSamaMegaReport() {
    this.requestsFilter.IsExcel = 1;
    console.log(this.requestsFilter);

    if (this.startDate) {
      this.requestsFilter.StartDate =
        this.startDate.toLocaleDateString("en-US");
    }
    if (this.endDate) {
      this.requestsFilter.EndDate = this.endDate.toLocaleDateString("en-US");
    }

    // this.eventHolder = event;
    // this.loading = true;
    this._requestsService.SamaStatisticsExcelReport(this.requestsFilter, "").subscribe(
      (data) => {
        console.log(data.data);
        if (data.data) {
          FileServer.saveAs(
            "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
              data.data,
            "Sama Statictis.xlsx"
          );
        }
        this.firstTime = false;
        // this.loading = false;
      },
      (error: any) => {
        this.firstTime = false;
        this.loading = false;
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  filterClick(e) {
    this.isSearch = true;
    this.requestsFilter.IsExcel = 0;
    //  Set Timezone
    if (this.startDate) {
      this.requestsFilter.StartDate =
        this.startDate.toLocaleDateString("en-US");
    }
    if (this.endDate) {
      this.requestsFilter.EndDate = this.endDate.toLocaleDateString("en-US");
    }
    console.log(this.requestsFilter);
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._requestsService
      .SamaStatisticsReport(
        this.requestsFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${
          event.rows
        }&sortField=${
          event.sortField ? event.sortField : this.defaultSortField
        }&sortOrder=${event.sortOrder === 1 ? true : false}`
      )
      .subscribe(
        (data) => {
          console.log(data.data);
          // if (data.data.length > 0) {
          //   this.requests = data.data;
          // } else {
          //   this.requests = [];
          // }
          this.totalPolicesGenderModel = data.data.TotalPolicesPerGenderModel;
          this.allAgeRanges = data.data.AllAgeRanges;
          this.allChannelModel = data.data.AllChannelModel;
          this.allPaymentMethodModel = data.data.AllPaymentMethodModel;
          this.totalInSystem = data.data.totalInSystemModel;
          this.totalIndividualPolicesPerCity =
            data.data.TotalIndividualPolicesPerCity;
          this.totalCorporatePolicesPerCity =
            data.data.TotalCorpratePolicesPerCity;
          this.requestsCount = data;
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
        },
        (error: any) => {
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach((item) => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

}
