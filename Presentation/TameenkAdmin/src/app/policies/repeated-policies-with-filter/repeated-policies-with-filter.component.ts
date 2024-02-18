import { Component, OnInit } from '@angular/core';
import { AdminPolicyService, CommonResponse, LocalizationService } from 'src/app/core';
import { OutputModelRepeated } from './Models/OutputModelRepeated';
import { RepeatedFilterModel } from './Models/RepeatedFilterModel';
import { RepeatedProcessingQueueInfo } from './Models/RepeatedProcessingQueueInfo';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from "file-saver";
import { OutPutResult } from './Models/OutPutresult';


@Component({
  selector: 'app-repeated-policies-with-filter',
  templateUrl: './repeated-policies-with-filter.component.html',
  styleUrls: ['./repeated-policies-with-filter.component.css']
})
export class RepeatedPoliciesWithFilterComponent implements OnInit {
    requestsFilter: RepeatedFilterModel = new RepeatedFilterModel();
    allRepeatedPolicies: RepeatedProcessingQueueInfo[];
    RepeatedPoliciesCount;
    repeatedItemValue;
    repeatedItem;
    outPut: RepeatedProcessingQueueInfo[];
    requests: any;
    loading: boolean;
    firstTime: boolean;
    emptyStringValue = "ــــــــــــــــــ";
    eventHolder;
    defaultSortField = "";
    isEnglish: boolean;
    today = new Date();
    selectedRequest;
    isSearch = false;
    selectedType;
    Isloading:boolean;
    status:boolean;
  
    constructor(
      private _requestsService: AdminPolicyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService
    ) {}
  
    ngOnInit() {
      this.requestsFilter = {
        endDate: new Date(),
        startDate: new Date(),
        duplicatedData: null,
        language: null,
        isExport: false,
        pageIndex: null,
        pageSize: null
      };
      this.loading = true;
      this.Isloading=false;
      this.firstTime = true;
      this.status=true;
      this.isEnglish =
        this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
          ? true
          : false;
  
      if (this.isEnglish) {
        this.repeatedItem = [
          // { label: "All", value: null },
          { label: "Email", value: "1" },
          { label: "Phone", value: "2" },
          { label: "IBAN", value: "3" }
        ];
      } else {
        this.repeatedItem = [
          // { label: "الكل", value: null },
          { label: "البريد الإلتروني", value: "1" },
          { label: "رقم الجوال", value: "2" },
          { label: "الرقم البنكى", value: "3" }
        ];
      }
    }
  
    // showDetails(request: OutputModelRepeated) {
    //   this.selectedRequest = request;
    // }
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
      if (this.isEnglish) {
        this.requestsFilter.language = "en";
      } else {
        this.requestsFilter.language = "ar";
      }
  
      e.reset();
    }
  
  
    changed(e) { 
   this.selectedType= e.value.value;
   this.status=false;
    }
  
  
    repeatedPoliciesLazyLoad(event) {
      this.Isloading=true;
      this.eventHolder = event;
      this.loading = true;
      this.requestsFilter.pageIndex = event.first / event.rows + 1;
      this.requestsFilter.pageSize = event.rows;
      this.requestsFilter.duplicatedData = this.repeatedItemValue;
      this.requestsFilter.isExport = false;
  this.requestsFilter.duplicatedData=this.selectedType;
      this._requestsService.getRepeatedPoliciesWithFilter(this.requestsFilter)
      .subscribe((data: CommonResponse<OutPutResult>) => {
          this.allRepeatedPolicies = data.data.Result;
          this.RepeatedPoliciesCount = data.data.TotalCount;
          this.loading = false;
          this.Isloading=false;
          this.firstTime = false;
          this.isSearch = false;
        }, (error: any) => {
          this.loading = false;
          this.firstTime = false;
          this.isSearch = false;
          if (error.errors) {
            this.Isloading=false;
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
        this.requestsFilter.pageIndex = 0;
        this.requestsFilter.pageSize = 0;
  
  
        this._requestsService
          .getRepeatedPoliciesWithFilter(this.requestsFilter)
          .subscribe(
            (data) => {
              if (data.data) {
                FileSaver.saveAs(
                  "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                    data.data.sheet,
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
  }
  
  


