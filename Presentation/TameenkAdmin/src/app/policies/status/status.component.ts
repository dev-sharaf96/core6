import * as FileSaver from 'file-saver';

import { Component, OnInit } from '@angular/core';

import { AdminPolicyService } from 'src/app/core/services/admin-policy.service';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { PolicyListing } from '../policies-listing';
import { PolicyStatusEnum } from 'src/app/core/models/policy-status.enum';
import { StatusPolicies } from './policies-status';
import { SuccessFilter } from '../success-policies/success-filter';
import { SuccessPolicies } from '../success-policies/success-policies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statusFilter: SuccessFilter;
  policyListing: PolicyListing[];
  policyListingCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'policyIssueDate';
  isEnglish: boolean;
  selectedPolicy;
  PolicyStatusEnum = PolicyStatusEnum;
  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  
    ngOnInit() {
      this.statusFilter = this._adminPolicyService.successFilter;
      this.loading = true;
      this.firstTime = true;
      this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  
    }

    filterClick(e) {
      var isValid = this.AtLeastOneValidator();

      if(isValid){
        e.reset();
      }
      else{
        var errorMessageEn = "Please fill at least one field";
        var errorMessageAr = "برجاء ملئ حقل واحد علي الأقل";
        this.firstTime = true;

        this._toastrService.error(this.isEnglish ? errorMessageEn:errorMessageAr);
      }
    }

    StatusPoliciesLazyLoad(event) {
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
      this._adminPolicyService.getPolicyStatusWithFilter(this.statusFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
          event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<PolicyListing[]>) => {
    
          this.policyListing = data.data;
          this.policyListingCount = data.totalCount;
          this.loading = false;
          this.firstTime = false;
        }, (error: any) => {
          this.loading = false;
          this.firstTime = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
    }
    
    downloadPolicy(fileId, referenceId, name) {
      this._adminPolicyService.downloadPolicyFile(fileId, referenceId).subscribe(
        (data: CommonResponse<string>) => {
          if (data.data) {
            FileSaver.saveAs('data:application/pdf;base64,' + data.data, name + '.pdf');
          }
        }, (error: any) => {
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
    }
    reDownloadPolicyFile(referenceId, name) {
      this.loading = true;
      this._adminPolicyService.reDownloadPolicyFile(referenceId).subscribe(
        (data: CommonResponse<string>) => {
          if (data.data) {
            FileSaver.saveAs('data:application/pdf;base64,' + data.data, name + '.pdf');
          }
          this.StatusPoliciesLazyLoad(this.eventHolder);
        }, (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
    }
    reGeneratePolicy(referenceId, name) {
      this.loading = true;
      this._adminPolicyService.reGeneratePolicy(referenceId).subscribe(
        (data: CommonResponse<string>) => {
          if (data.data) {
            FileSaver.saveAs('data:application/pdf;base64,' + data.data, name + '.pdf');
          }
          this.StatusPoliciesLazyLoad(this.eventHolder);
        }, (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
    }

    AtLeastOneValidator (){
      var policy_number = document.getElementById('policy_number') as HTMLInputElement;
      var invoiceNo = document.getElementById('invoiceNo') as HTMLInputElement;
      var sequenceNo = document.getElementById('sequenceNo') as HTMLInputElement;
      var customNo = document.getElementById('customNo') as HTMLInputElement;
      var nationalId = document.getElementById('nationalId') as HTMLInputElement;
      var insuredFirstNameAr = document.getElementById('insuredFirstNameAr') as HTMLInputElement;
      var insuredLastNameAr = document.getElementById('insuredLastNameAr') as HTMLInputElement;
      var insuredEmail = document.getElementById('insuredEmail') as HTMLInputElement;
      var referenceNo = document.getElementById('referenceNo') as HTMLInputElement;
      var merchantId = document.getElementById('merchantId') as HTMLInputElement;



     if(policy_number.value || invoiceNo.value || sequenceNo.value || customNo.value
      || nationalId.value || insuredFirstNameAr.value || insuredLastNameAr.value || insuredEmail.value || referenceNo.value||merchantId.value ){
       return true;
     }
     else{
       return false;
     }
      };
  

  }
