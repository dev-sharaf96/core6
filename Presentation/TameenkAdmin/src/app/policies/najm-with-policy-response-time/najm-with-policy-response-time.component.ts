import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { najmPolicyFilter } from './najmPolicyFilter';
import { najmPolicyResponseModel } from './models/najmResponeModel';
import { najmPolicyResponseOutput } from './models/najmResponseOutput';

@Component({
  selector: 'app-najm-with-policy-response-time',
  templateUrl: './najm-with-policy-response-time.component.html',
  styleUrls: ['./najm-with-policy-response-time.component.css']
})
export class NajmWithPolicyResponseTimeComponent implements OnInit {

 
  najmPolicyFilter: najmPolicyFilter={
    endDate:new Date(),
    policyNo:null,
    startDate:new Date(),
    referenceNo:null,
    companyId:null,
    exports:null,
  };
    
    najmPolicyList: najmPolicyResponseOutput;
    // checkout: CheckoutsModel;
    resultList:najmPolicyResponseModel[]=[];
   responseListCount;
    loading: boolean;
    firstTime: boolean;
    isShow:boolean;
    emptyStringValue = 'ــــــــــــــــــ';
    eventHolder;
    defaultSortField = 'ReferenceId';
    isEnglish: boolean;
    isEdit:boolean;
    today = new Date();
    constructor(
     private _policyService: AdminPolicyService,
      private _toastrService: ToastrService
    ) {}
  
    ngOnInit() {
     // this.checkoutsFilter = this._checkoutsService.checkoutsFilter;
     this.najmPolicyFilter.startDate = this.today;
     this.najmPolicyFilter.endDate = this.today
      this.loading = false;
      this.firstTime = true;
      this.isEnglish = true;
      this.isEdit = false;
      this.isShow=false;
    }
    
    filterClick(e) {
      this.loading=true;
      this.isShow=true;
      e.reset();
    }
  
    najmPolicyLazyLoad(event) {
      this._policyService.najmResponsepolicies(this.najmPolicyFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
        event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
        .subscribe((data: CommonResponse<najmPolicyResponseOutput>) => {
if(data.data.ErrorCode!='1'){
  this._toastrService.error(data.data.ErrorDescription);
  this.isShow=false;
}
else{
  this.isShow=false;
  this.najmPolicyList = data.data;
  this.resultList=data.data.Result;
  this.responseListCount = this.najmPolicyList.totalCount;
}
           
            this.firstTime = false;
            this.loading = false;
          },
          (error: any) => {
            this.firstTime = false;
            this.loading = false;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );
    }
  
    exportExcel(event) {
      this.najmPolicyFilter.exports=true;
      this._policyService.najmResponsepolicies(this.najmPolicyFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
        event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
        .subscribe((data: CommonResponse<najmPolicyResponseOutput>) =>  {
        if (data.data.Result) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data.File,
           'Success-Policies.xlsx');
        }
      });
    }
}
