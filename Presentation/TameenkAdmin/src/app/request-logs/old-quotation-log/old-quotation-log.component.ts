import { QuotationDetails } from './Models/QuotationDetails';
import { QuotationFilter } from './Models/QuotationFilter';
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  LocalizationService,
  CommonResponse,
  AdminPolicyService,
  RequestLogsService,
} from "../../core";
import * as FileSaver from "file-saver";
import { QuotationOutputModel } from './Models/QuotationOutputModel';

@Component({
  selector: 'app-old-quotation-log',
  templateUrl: './old-quotation-log.component.html',
  styleUrls: ['./old-quotation-log.component.css']
})
export class OldQuotationLogComponent implements OnInit {
  requestsFilter: QuotationFilter;
  outPut: QuotationDetails[];
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
    private _requestService: RequestLogsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.requestsFilter = {
      pageNumber: null,
      pageSize: null,
      nationalId: null,
      sequenceNumber: null,
      referenceNo: null,
      isExport: false,
    };
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;
  }
  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this.requestsFilter.isExport = true;
      this._requestService
        .getOldQuotationRequestLog(this.requestsFilter)
        .subscribe(
          (data) => {
            if (data.data) {
              FileSaver.saveAs(
                "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                  data.data,
                "old-quotations.xlsx"
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
  showDetails(request: QuotationOutputModel) {
    this.selectedRequest = request;
  }
  filterClick(e) {
    //Set Timezone
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this.requestsFilter.pageNumber = event.first / event.rows + 1;
    this.requestsFilter.pageSize = event.rows;
    this._requestService
      .getOldQuotationRequestLog(this.requestsFilter)
      .subscribe(
        (data: QuotationOutputModel) => {
          if (data.data.Result != null) {
            this.outPut = data.data.Result.data;
          }
          if( data.data.ErrorCode != 1 )
          {
            this._toastrService.error(data.data.ErrorDescription);
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

