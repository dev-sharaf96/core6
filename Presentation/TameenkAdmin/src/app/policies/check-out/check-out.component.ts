import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse, InsuranceCompanyService, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { CheckOutInfo } from './CheckOutInfo';
import { OutputModel } from './OutputModel';
import { PolicyFilter } from './PolicyFilter';
import { PolicyListing } from '../policies-listing';
import { SelectItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { outputsModel } from 'src/app/policies/renwal-policies/Models/outputsModel';
import { result } from './../renwal-policies/Models/result';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
    policiesFilter: PolicyFilter;
    adminOutPut:any;
    Output:OutputModel;
    result:any;
    policyListing:any;
    SuccessPoliciesCount;
    loading: boolean;
    firstTime: boolean;
    emptyStringValue = 'ــــــــــــــــــ';
    eventHolder;
    defaultSortField = 'policyNo';
    isEnglish: boolean;
    selectedPolicy;
    SuccessPoliciesExcel = [];
    today = new Date();
    currentCheckoutEmail = '';
    openPpUp: boolean = false; //default value for resend modal
    emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    clicked: boolean = false;
    isSearch = false;
    insuredType:SelectItem[];
    
    constructor(
      private _adminPolicyService: AdminPolicyService,
      private _insuranceCompanyService: InsuranceCompanyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService) { }
    
      ngOnInit() {
        
      this.Output={
        data: [{
            referenceId: null,
            channel: null,
            email: null,
            phone:null,
            iBAN: null,
            nIN: null,
            policyNo: null,
            policyIssueDate: null,
            nationalId: null,
            fullName:null}
          ],
        file: '',
        totalCount: 0
        };
        this.policyListing=[
          {
            referenceId: null,
            channel: null,
            email: null,
            phone:null,
            iBAN: null,
            nIN: null,
            policyNo: null,
            policyIssueDate: null,
            nationalId: null,
            fullName:null}
        ]
        this.policiesFilter = this._adminPolicyService.PolicyFilter;
        this.policiesFilter.startDate = this.today;
        this.policiesFilter.endDate = this.today;
        this.loading = true;
        this.firstTime = true;
        this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
        if(this.isEnglish){
          this.insuredType=[
            {label:'All', value:null},
            {label:'TPL', value:'1'},
            {label:'Comprehensive', value:'2'},
          ];
       
        }else{
          this.insuredType=[
            {label:'الكل', value:null},
            {label:'سيارات', value:'1'},
            {label:'شامل', value:'2'},
          ];
        
        }
      }
    
      exportExcel() {
        this.policiesFilter.exports=true;
        if (this.policiesFilter.startDate) {
          this.policiesFilter.startDate.setHours(
            this.policiesFilter.startDate.getHours() - this.policiesFilter.startDate.getTimezoneOffset() / 60);
        }
        if (this.policiesFilter.endDate) {
          this.policiesFilter.endDate.setHours(
            this.policiesFilter.endDate.getHours() - this.policiesFilter.endDate.getTimezoneOffset() / 60);
        }
        this._adminPolicyService.getPolicyDetails(this.policiesFilter).subscribe((data) => {
          if (data.data.Result) {
            FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data.Result.file,
             'Success-Policies.xlsx');
          }
        });
      }
    
      
      filterClick(e) {
        // Set Timezone
        this.policiesFilter.exports=false;
        this.isSearch = true;
        if (this.policiesFilter.startDate) {
          this.policiesFilter.startDate.setHours(
            this.policiesFilter.startDate.getHours() - this.policiesFilter.startDate.getTimezoneOffset() / 60);
        }
        if (this.policiesFilter.endDate) {
          this.policiesFilter.endDate.setHours(
            this.policiesFilter.endDate.getHours() - this.policiesFilter.endDate.getTimezoneOffset() / 60);
        }
        e.reset();
      }
      SuccessPoliciesLazyLoad(event) {
        if (event.sortField === 'insuredFullNameAr' || event.sortField === 'insuredFullNameEn') {
          this.policyListing  = this.policyListing.sort((a, b) => {
            if (event.sortOrder === 1 ) {
              return a[event.sortField].localeCompare(b[event.sortField]);
            } else {
              return b[event.sortField].localeCompare(a[event.sortField]);
            }
          });
          return;
        }
        this.eventHolder = event;
        this.loading = true;
        this.policiesFilter.pageNumber = (event.first / event.rows) + 1;
        this.policiesFilter.pageSize = event.rows;
        this._adminPolicyService.getPolicyDetails(this.policiesFilter)
        .subscribe((data: CommonResponse<OutputModel>) => {
            this.adminOutPut = data.data;
            this.Output=this.adminOutPut.Result;
            this.policyListing=this.Output.data;
            console.log(this.Output);
            this.SuccessPoliciesCount = this.Output.totalCount;
            this.loading = false;
            this.firstTime = false;
            this.isSearch = false;
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
}
