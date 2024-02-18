import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  LocalizationService,
  CommonResponse,
  AdminPolicyService,
} from "../../core";
import { FilterModel } from "./Models/FilterModel";
import { OutputModel } from "./Models/OutputModel";
import { ProcessingQueueInfo } from "./Models/ProcessingQueueInfo";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-pending-policies",
  templateUrl: "./pending-policies.component.html",
  styleUrls: ["./pending-policies.component.css"],
})
export class PendingPoliciesComponent implements OnInit {
  requestsFilter: FilterModel;
  insuredtypeValue;
  insuredType;
  // insuredType:SelectItem[];
  outPut: ProcessingQueueInfo[];
  requests: any;
  requestsCount: number;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  defaultSortField = "";
  isEnglish: boolean;
  today = new Date();
  selectedRequest;
  constructor(
    private _requestsService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.insuredtypeValue = null;
    this.requestsFilter = {
      endDate: new Date(),
      startDate: new Date(),
      pageNumber: null,
      pageSize: null,
      nationalId: null,
      vehicleId: null,
      referenceNo: null,
      companyId: null,
      productTypeId: null,
      isExport: false,
    };
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;

    if (this.isEnglish) {
      this.insuredType = [
        { label: "All", value: null },
        { label: "TPL", value: "1" },
        { label: "Comprehensive", value: "2" },
      ];
    } else {
      this.insuredType = [
        { label: "الكل", value: null },
        { label: "سيارات", value: "1" },
        { label: "شامل", value: "2" },
      ];
    }
  }
  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      if (this.requestsFilter.startDate) {
        this.requestsFilter.startDate.setHours(
          this.requestsFilter.startDate.getHours() -
            this.requestsFilter.startDate.getTimezoneOffset() / 60
        );
      }
      if (this.requestsFilter.endDate) {
        this.requestsFilter.endDate.setHours(
          this.requestsFilter.endDate.getHours() -
            this.requestsFilter.endDate.getTimezoneOffset() / 60
        );
      }
      this.requestsFilter.isExport = true;
      this._requestsService
        .getPolicyFromQueueWithFilter(this.requestsFilter)
        .subscribe(
          (data) => {
            if (data.data) {
              FileSaver.saveAs(
                "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                  data.data,
                "pending-policies.xlsx"
              );
            }
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            if (error.errors) {
              error.errors.forEach((item) => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );
    }
  }
  showDetails(request: OutputModel) {
    this.selectedRequest = request;
  }
  filterClick(e) {
    //Set Timezone
    if (this.requestsFilter.startDate) {
      this.requestsFilter.startDate.setHours(
        this.requestsFilter.startDate.getHours() -
          this.requestsFilter.startDate.getTimezoneOffset() / 60
      );
    }
    if (this.requestsFilter.endDate) {
      this.requestsFilter.endDate.setHours(
        this.requestsFilter.endDate.getHours() -
          this.requestsFilter.endDate.getTimezoneOffset() / 60
      );
    }
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this.requestsFilter.pageNumber = event.first / event.rows + 1;
    this.requestsFilter.pageSize = event.rows;
    this.requestsFilter.productTypeId = this.insuredtypeValue;
    this._requestsService
      .getPolicyFromQueueWithFilter(this.requestsFilter)
      .subscribe(
        (data: OutputModel) => {
          if (data.data.Result != null) {
            this.outPut = data.data.Result.data;
          }
          this.requestsCount = data.data.Result.totalCount;
          this.firstTime = false;
          this.loading = false;
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
}
