import * as FileSaver from 'file-saver';

import {
  AdminPolicyService,
  CommonResponse,
  LocalizationService,
} from "src/app/core";
import { Component, OnInit } from "@angular/core";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { ToastrService } from "ngx-toastr";
import { outputsModel } from "./Models/outputsModel";
import randomColor from "randomcolor";
import { renewalData } from './Models/renewalData';
import { renewalFilter } from "./renewalFilter";

@Component({
  selector: "app-renwal-policies",
  templateUrl: "./renwal-policies.component.html",
  styleUrls: ["./renwal-policies.component.css"],
})
export class RenwalPoliciesComponent implements OnInit {
  minDateFrom:any=''
  options;
  totalcount:number=0;
  renewdPercentage:number=0;
  renewalReportData:any='';
  renewalReportGridData:any='';
  chartData;
  renewalFilter: renewalFilter = new renewalFilter();
  // samaListing: SamaReportListing[] = [];
  SuccessPoliciesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  isEnglish: boolean;
  selectedPolicy;
  SuccessPoliciesExcel = [];
  today = new Date();
  currentCheckoutEmail = "";
  isSearch = false;
  totalCount: number;
  renewedCount: number;
  expiredCount: number;
  expiredPercentage:number=0;

  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.loading=false;
    this.renewalFilter.expirationDateFrom = this.today;
    this.renewalFilter.expirationDateTo = this.today;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;
  }

  filterClick(e) {
    // Set Timezone

    this.isSearch = true;
    this.loading=true;
    if (this.renewalFilter.expirationDateFrom) {
      this.renewalFilter.expirationDateFrom.setHours(
        this.renewalFilter.expirationDateFrom.getHours() -
          this.renewalFilter.expirationDateFrom.getTimezoneOffset() / 60
      );
    }
    if (this.renewalFilter.expirationDateTo) {
      this.renewalFilter.expirationDateTo.setHours(
        this.renewalFilter.expirationDateTo.getHours() -
          this.renewalFilter.expirationDateTo.getTimezoneOffset() / 60
      );
    }
    // e.reset();
    if (this.isEnglish) {
      this.renewalFilter.lang = "en";
    } else {
      this.renewalFilter.lang = "ar";
    }
console.log(this.renewalFilter)
e.reset();
  }

  RenewalPoliciesLazyLoad(event) {
    this.eventHolder = event;
     this.loading = true;
     let pageIndex = event.first / event.rows;
     this.renewalFilter.export = false;
    this._adminPolicyService.renewalpolicies(this.renewalFilter, `pageIndex=${pageIndex + 1}&pageSize=${event.rows}`)
     .subscribe((result: CommonResponse<outputsModel>) => {
      let data = result.data;
      console.log(data)
      if(data.Result!=null){
        this.totalcount=data.Result.renewalDataCount;
        this.renewalReportData=data.Result.renewalStatistics;
        this.renewalReportGridData=data.Result.renewalData;
      }

        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;

        this.chartData = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
            },
          ],
        };
        if(data.ErrorCode!=1){

          this._toastrService.error((data.ErrorDescription));

        }
        if (data.Result) {
          this.totalCount = data.Result.totalPoliciesCount;
          this.renewedCount = data.Result.renewalDataCount;
          if(this.renewedCount) {
            this.chartData.labels.push('Renewal Count');
            this.chartData.datasets[0].data.push(this.renewedCount);
            this.chartData.datasets[0].backgroundColor.push(randomColor());
          }

          this.expiredCount = this.totalCount - this.renewedCount;
          if(this.expiredCount) {
            this.chartData.labels.push('Expired Count');
            this.chartData.datasets[0].data.push(this.expiredCount);
            this.chartData.datasets[0].backgroundColor.push(randomColor());
          }

          this.expiredPercentage = +((this.expiredCount * 100) / this.totalCount ).toFixed(2);
          this.renewdPercentage = +((this.renewedCount * 100) / this.totalCount).toFixed(2);

          const datalabels = ChartDataLabels;
          this.options = {
            legend: { position: "left"},
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  const dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((input) => {
                    sum += input;
                  });
                  const percentage = ((value * 100) / sum).toFixed(2) + " %";
                  return percentage;
                },
                color: "#faf3f6",
              },
            },
          };
        }
      }, (error: any) => {
        this.loading = false;
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


  exportExcel(){
    if (!this.loading) {
    //  this.loading = true;
      this.renewalFilter.export=true;
     console.log(this.renewalFilter)
      this._adminPolicyService.renewalpolicies(this.renewalFilter,'').subscribe((result: CommonResponse<outputsModel>) => {
        if (result.data) {
          console.log(result.data.Result.exportBase64String);
          if(result.data.ErrorCode == 1) {
            FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + result.data.Result.exportBase64String,
           'Renewla Data.xlsx');
          } else {
            this._toastrService.error(result.data.ErrorDescription);
          }
        }
        this.renewalFilter.export=false;
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
}
