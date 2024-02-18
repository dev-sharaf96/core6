import { CommonResponse, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { RequestsService } from 'src/app/core/services/requests.service';
import {SelectItem} from 'primeng/api';
import { ServiceRequestPerCompanyFilter } from 'src/app/Request-Per-Comany/request-per-company/requestPerCompanyFilter';
import { ToastrService } from 'ngx-toastr';
import {requstPerCompanyModel} from 'src/app/Request-Per-Comany/requstPerCompanyModel';

@Component({
  selector: 'app-request-per-company',
  templateUrl: './request-per-company.component.html',
  styleUrls: ['./request-per-company.component.css']
})
export class RequestPerCompanyComponent implements OnInit {

  insuredtypeValue;
  moduleTypValue;
  moduleType;
  insuredType:SelectItem[];
  requestsFilter: ServiceRequestPerCompanyFilter;
  requests: requstPerCompanyModel[];
  requestsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = '';
  isEnglish: boolean;
  today = new Date();
  selectedRequest;
  startDate: Date = new Date();
  endDate: Date = new Date();
  isSearch = false;
  constructor(
    private _requestsService: RequestsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    
  ) {}

  ngOnInit() {
    this.insuredtypeValue=null;
    this.moduleTypValue=null;
    // this.requestsFilter.StatusCode = null;
    this.requestsFilter = new ServiceRequestPerCompanyFilter();
    console.log(this.requestsFilter);
    this.requestsFilter.StartDate= this.startDate.toLocaleDateString('en-US');
    this.requestsFilter.EndDate= this.endDate.toLocaleDateString('en-US');
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? true
        : false;
        if(this.isEnglish){
          this.insuredType=[
            {label:'All', value:null},
            {label:'TPL', value:'1'},
            {label:'comprehensive', value:'2'},
          ];
          this.moduleType=[
            {label:'All', value:null},
            {label:'Vehicle', value:'1'},
            {label:'Autolease', value:'2'},
          ]
        }else{
          this.insuredType=[
            {label:'الكل', value:null},
            {label:'سيارات', value:'1'},
            {label:'شامل', value:'2'},
          ];
          this.moduleType=[
            {label:'All', value:null},
            {label:'مركبات', value:'1'},
            {label:'Autolease', value:'2'},
          ]
        }
  }


  filterClick(e) {
    this.isSearch = true;
   //  Set Timezone
    if (this.startDate) {
     this.requestsFilter.StartDate = this.startDate.toLocaleDateString('en-US');
    }
     if (this.endDate) {
      this.requestsFilter.EndDate = this.endDate.toLocaleDateString('en-US');
    }
    this.requestsFilter.InsuranceTypeId=this.insuredtypeValue;
    this.requestsFilter.ModuleId=this.moduleTypValue;
    console.log(this.requestsFilter)
    e.reset();
  }
  requestsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._requestsService.GetServiceRequestPerCompany(this.requestsFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
        event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`
        ).subscribe((data: CommonResponse<requstPerCompanyModel[]>) => {
          console.log(data)
          if (data.data.length > 0) {
            this.requests = data.data;
          } 
          else {
            this.requests = [];
          }
          this.requestsCount = data.totalCount;
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
        }, (error: any) => {
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        });
  }

}
