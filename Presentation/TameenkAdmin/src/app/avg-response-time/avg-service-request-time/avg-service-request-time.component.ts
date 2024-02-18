import { CommonResponse, LocalizationService } from "src/app/core";
import { Component, OnInit } from "@angular/core";

import { AvgServiceRequestTimeFilter } from "src/app/avg-response-time/avg-service-request-time/avg-service-request-time-Filter.model";
import { AvgServiceRequestTimeModel } from "src/app/avg-response-time/avg-service-request-time.model";
import { RequestsService } from "src/app/core/services/requests.service";
import { SelectItem } from "primeng/api";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-avg-service-request-time",
  templateUrl: "./avg-service-request-time.component.html",
  styleUrls: ["./avg-service-request-time.component.css"],
})
export class AvgServiceRequestTimeComponent implements OnInit {
  insuredtypeValue: any;
  moduleTypValue;
  moduleType;
  requestsFilter: AvgServiceRequestTimeFilter;
  requests: AvgServiceRequestTimeModel[];
  requestsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  defaultSortField = "";
  isEnglish: boolean;
  today = new Date();
  today2 = new Date();
  selectedRequest;
  isSearch = false;
  insuredType: SelectItem[];
  myendDate= new Date();;
  constructor(
    private _requestsService: RequestsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.moduleTypValue = null;
    this.insuredtypeValue = null;
    this.requestsFilter = this._requestsService.requestsRespFilter;
    console.log(this.requestsFilter);
    this.requestsFilter.startDate = this.today;
    this.requestsFilter.endDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;
    if (this.isEnglish) {
      this.moduleType = [
        { label: "All", value: 0 },
        { label: "Vehicle", value: 1 },
        { label: "Autolease", value: 2 },
      ];
      this.insuredType = [
        { label: "All", value: 0 },
        { label: "TPL", value: "1" },
        { label: "Comprehensive", value: "2" },
      ];
    } else {
      this.insuredType = [
        { label: "الكل", value: 0 },
        { label: "سيارات", value: "1" },
        { label: "شامل", value: "2" },
      ];
      this.moduleType = [
        { label: "All", value: 0 },
        { label: "مركبات", value: 1 },
        { label: "Autolease", value: 2 },
      ];
    }
  }

  filterClick(e) {
    this.today2 = new Date();
    this.isSearch = true;
    this.requestsFilter.startDate = new Date(this.requestsFilter.startDate.setHours(0,0,0));
  //  this.requestsFilter.endDate= new Date( this.requestsFilter.endDate.setHours(this.today2.getHours(),this.today2.getMinutes(),this.today.getSeconds()));
    this.requestsFilter.endDate= new Date( this.requestsFilter.endDate.setHours(23, 59, 59,58));
    e.reset();
  }

  HandleFilterationModel() {
    if (this.moduleTypValue && this.moduleTypValue > 0) {
      this.requestsFilter.moduleId = this.moduleTypValue;
    } else {
      this.requestsFilter.moduleId = null;
    }
    if (this.insuredtypeValue && this.insuredtypeValue > 0) {
      this.requestsFilter.insuranceTypeId = this.insuredtypeValue;
    } else {
      this.requestsFilter.insuranceTypeId = null;
    }

    if (this.requestsFilter.startDate) {
      this.requestsFilter.startDate.setHours(
      this.requestsFilter.startDate.getHours() - this.requestsFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.requestsFilter.endDate) {
      this.requestsFilter.endDate.setHours(
      this.requestsFilter.endDate.getHours() - this.requestsFilter.endDate.getTimezoneOffset() / 60);
    }
  }

  requestsLazyLoad(event) {
    this.HandleFilterationModel();
    this.eventHolder = event;
    this.loading = true;
    this._requestsService
      .GetAVGServiceRequestResponseTime(
        this.requestsFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${
          event.rows
        }&sortField=${
          event.sortField ? event.sortField : this.defaultSortField
        }&sortOrder=${event.sortOrder === 1 ? true : false}`
        
      )
      .subscribe(
        (data: CommonResponse<AvgServiceRequestTimeModel[]>) => {
          this.requestsFilter.endDate=new Date(this.requestsFilter.endDate.setDate(this.requestsFilter.endDate.getDate()-1));
          if (data.data.length > 0) {
            this.requests = data.data;
          } else {
            this.requests = [];
          }
          this.requestsCount = data.totalCount;
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
