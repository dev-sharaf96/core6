import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { RequestLogsService } from "../../core/services/requestLogs.service";
import * as XLSX from "xlsx";
import { filter } from "./Models/filter";
import { AdminPolicyService, PolicyService } from "src/app/core";
import { DetailsList } from "./Models/detailsList";
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-get-customers-over-five-policy',
  templateUrl: './get-customers-over-five-policy.component.html',
  styleUrls: ['./get-customers-over-five-policy.component.css']
})
export class GetCustomersOverFivePolicyComponent implements OnInit {

  Filter: filter= new filter();
  policyListing: DetailsList [];
  Isloading:boolean;
  today = new Date();
  TotalCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  isSearch = false;
  constructor(
    private _policyService: AdminPolicyService,
    private _toastrService: ToastrService,
    // private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.Filter.endDate= new Date();
    this.Filter.startDate= new Date();

    this.Isloading=false;
    this.loading = false;
    this.firstTime = true;

  }

  filterClick(e) {
    this.Isloading=true;
    this.loading=true;
    this.isSearch = true;
    if (this.Filter.startDate) {
      this.Filter.startDate.setHours(
        this.Filter.startDate.getHours() -
          this.Filter.startDate.getTimezoneOffset() / 60
      );
    }
    if (this.Filter.endDate) {
      this.Filter.endDate.setHours(
        this.Filter.endDate.getHours() -
          this.Filter.endDate.getTimezoneOffset() / 60
      );
    }
    e.reset();
  }

  smsLogLazyLoad(event) {

    this.loading=true;
this.Filter.isExport=false;
this.Filter.pageSize=event.rows;
this.Filter.pageNumber=event.first / event.rows;
    this._policyService.getDriverOverFivePolicies(this.Filter)
      .subscribe((data:any) => {
        if(!data.data){
          return;
        }
      this.policyListing=data.data.Result;
      this.TotalCount=data.data.TotalCount;
      console.log(this.TotalCount);
        this.firstTime = false;
        this.Isloading=false;
        this.loading=false;
        this.isSearch = false;
        },
        (error: any) => {
          this.firstTime = false;
          this.Isloading=false;
          this.loading=false;
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
      if (this.Filter.startDate) {
        this.Filter.startDate.setHours(
          this.Filter.startDate.getHours() -
            this.Filter.startDate.getTimezoneOffset() / 60
        );
      }
      if (this.Filter.endDate) {
        this.Filter.endDate.setHours(
          this.Filter.endDate.getHours() -
            this.Filter.endDate.getTimezoneOffset() / 60
        );
      }
      this.Filter.isExport = true;
      this.Filter.pageNumber = 0;
      this.Filter.pageSize = 0;


      this._policyService.getDriverOverFivePolicies(this.Filter)
        .subscribe(
          (data) => {
            if (data.data) {
              console.log(data.data);
              FileSaver.saveAs(
                "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                  data.data.sheet
                  ,
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