import * as FileSaver from 'file-saver';

import { CommonResponse, LocalizationService } from '../core';
import { Component, OnInit } from '@angular/core';

import {CheckboxModule} from 'primeng/checkbox';
import { RequestNewModel } from './requests-new.model';
import { RequestsNewFilter } from './requests-new-filter.model';
import { RequestsService } from '../core/services/requests.service';
import { SelectItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-requests-new',
  templateUrl: './requests-new.component.html',
  styleUrls: ['./requests-new.component.css']
})
export class RequestsNewComponent implements OnInit {
  insuredtypeValue;
  moduleTypValue;
  moduleType;
  insuredType:SelectItem[];
  requestsFilter: RequestsNewFilter;
  requests: RequestNewModel[];
  requestsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'serviceRequest';
  isEnglish: boolean;
  today = new Date();
  starttime : Date;
  endtime : Date;
  checked: boolean = false;
  startdate:Date;
  savedEndDate:Date;
  selectedRequest;
  isSearch = false;
  constructor(
    private _requestsService: RequestsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.insuredtypeValue=null;
    this.moduleTypValue=null;
    this.requestsFilter = this._requestsService.requestsFilter;
    this.requestsFilter.startDate = new Date(this.today.getFullYear(),this.today.getMonth(), this.today.getDate(), 0, 0, 0);
    console.log(this.requestsFilter.startDate);
    this.requestsFilter.endDate =  new Date(this.today.getFullYear(),this.today.getMonth(), this.today.getDate(),this.today.getHours(), this.today.getMinutes(),this.today.getSeconds() );
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
            {label:'Comprehensive', value:'2'},
            // {label:'OD', value:'9'}
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
            // {label:'OD', value:'9'},
          ];
          this.moduleType=[
            {label:'All', value:null},
            {label:'مركبات', value:'1'},
            {label:'Autolease', value:'2'},
          ]
        }
  }

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this.HandleFilterationDateTimeBeforeSendRequest();
      this._requestsService.getExcelWithFilterNew(this.requestsFilter).subscribe((data) => {
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
    this.requestsFilter.startDate = this.startdate;
    this.requestsFilter.endDate=this.savedEndDate ;
  }
  showDetails(request: RequestNewModel) {
    this.selectedRequest = request;
  }
  filterClick(e) {
    this.isSearch = true;
    this.requestsFilter.insuranceTypeId=this.insuredtypeValue;
    e.reset();
  }

  requestsLazyLoad(event) {
    this.HandleFilterationDateTimeBeforeSendRequest();
    this.eventHolder = event;
    this.loading = true;
    this._requestsService.getAllServicesWithFilterNew(this.requestsFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
        event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`
        ).subscribe((data: CommonResponse<RequestNewModel[]>) => {
          if (data.data.length > 0) {
           // this.requests = data.data.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : -1);
          this.requests = data.data;
          } else {
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

        this.requestsFilter.startDate = this.startdate;
       this.requestsFilter.endDate=this.savedEndDate ;
  }

  // HandleFilterationDateTimeBeforeSendRequest() {
  //   if(this.checked) {
  //     this.requestsFilter.startDate = new Date(this.requestsFilter.startDate.setHours(this.starttime.getHours(),this.starttime.getMinutes(),this.starttime.getSeconds()));
  //     this.requestsFilter.endDate= new Date( this.requestsFilter.endDate.setHours(this.endtime.getHours(),this.endtime.getMinutes(),this.endtime.getSeconds()));
  //   }

  //   else{
  //    // this.requestsFilter.startDate = new Date(this.requestsFilter.startDate.setHours(0,0,0,0));
  //   //  this.requestsFilter.endDate= new Date( this.requestsFilter.endDate.setHours(23, 59, 59,59));
  //   this.requestsFilter.endDate.setHours(
  //     this.requestsFilter.endDate.getHours() - this.requestsFilter.endDate.getTimezoneOffset() / 60);
  //     this.requestsFilter.startDate.setHours(
  //       this.requestsFilter.startDate.getHours() - this.requestsFilter.startDate.getTimezoneOffset() / 60);
  //   }

  //   this.startdate = this.requestsFilter.startDate;
  //   localStorage.savedate=this.requestsFilter.endDate;
  //   this.savedEndDate=new Date( new Date(localStorage.getItem('savedate')).setHours(5,5,5,5));

  //   if (this.requestsFilter.startDate) {
  //     this.requestsFilter.startDate.setHours(
  //     this.requestsFilter.startDate.getHours() - this.requestsFilter.startDate.getTimezoneOffset() / 60);
  //   }
  //   if (this.requestsFilter.endDate) {
  //     this.requestsFilter.endDate.setHours(
  //     this.requestsFilter.endDate.getHours() - this.requestsFilter.endDate.getTimezoneOffset() / 60);
  //   }
  // }
  HandleFilterationDateTimeBeforeSendRequest() {
    if(this.checked) {
      this.requestsFilter.startDate = new Date(this.requestsFilter.startDate.setHours(this.starttime.getHours(),this.starttime.getMinutes(),this.starttime.getSeconds()));
      this.requestsFilter.endDate= new Date( this.requestsFilter.endDate.setHours(this.endtime.getHours(),this.endtime.getMinutes(),this.endtime.getSeconds()));
    } else{
      this.requestsFilter.startDate = new Date(this.requestsFilter.startDate.setHours(0,0,0,0));
      this.requestsFilter.endDate= new Date( this.requestsFilter.endDate.setHours(23, 59, 59,59));
    }

    this.startdate = this.requestsFilter.startDate;
    localStorage.savedate=this.requestsFilter.endDate;
    this.savedEndDate=new Date( new Date(localStorage.getItem('savedate')).setHours(5,5,5,5));

    if (this.requestsFilter.startDate) {
      this.requestsFilter.startDate.setHours(
      this.requestsFilter.startDate.getHours() - this.requestsFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.requestsFilter.endDate) {
      this.requestsFilter.endDate.setHours(
      this.requestsFilter.endDate.getHours() - this.requestsFilter.endDate.getTimezoneOffset() / 60);
    }
  }

  resetTime (e){
let currentdate : Date =this.requestsFilter.endDate;
currentdate = new Date(currentdate.setHours(0,0,0,0))
let newd :  Date =new Date(new Date().setHours(0,0,0,0));
    if(currentdate.toISOString() != newd.toISOString()) {
      this.endtime= new Date (new Date().setHours(23,59,59,59));
    }
    else
    {
      this.endtime= new Date ();
      console.log(this.starttime);
    }
    this.starttime= new Date (new Date().setHours(0,0,0,0));

  }

  hideOD(){
    let index = this.insuredType.indexOf({label:'OD', value:'9'});
    if(index < 0 && this.requestsFilter.insuranceCompanyId == 22){
      this.insuredType.push({label:'OD', value:'9'});
      console.log(this.insuredType + "1");
    }
    else{
      debugger;
      // this.insuredType.splice(index,1);
      this.insuredType.forEach((element,index)=>{
        if(element.label=='OD')
        this.insuredType.splice(index,1)
     });
    }
  }
}
