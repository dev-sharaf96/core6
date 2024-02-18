import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse, InsuranceCompanyService, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { PolicyListing } from '../policies-listing';
import { SuccessFilter } from './success-filter';
import { SuccessPolicies } from './success-policies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-success-policies',
  templateUrl: './success-policies.component.html',
  styleUrls: ['./success-policies.component.css']
})
export class SuccessPoliciesComponent implements OnInit {
policiesFilter: SuccessFilter;
policyListing: PolicyListing[];
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
resendPolicyModel: PolicyListing;
clicked: boolean = false;
isSearch = false;

constructor(
  private _adminPolicyService: AdminPolicyService,
  private _insuranceCompanyService: InsuranceCompanyService,
  private _toastrService: ToastrService,
  private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.policiesFilter = this._adminPolicyService.successFilter;
    this.policiesFilter.startDate = this.today;
    this.policiesFilter.endDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;

  }

  exportCsv() {
    if (this.policiesFilter.startDate) {
      this.policiesFilter.startDate.setHours(
        this.policiesFilter.startDate.getHours() - this.policiesFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.policiesFilter.endDate) {
      this.policiesFilter.endDate.setHours(
        this.policiesFilter.endDate.getHours() - this.policiesFilter.endDate.getTimezoneOffset() / 60);
    }
        this._insuranceCompanyService.exportSuccessPoliciesAsExcel(this.policiesFilter).subscribe((data) => {
      if (data.data) {
        FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
         'Success22-Policies.xlsx');
      }
    });
  }

  showDetails(Policy: SuccessPolicies) {
    this.selectedPolicy = Policy;
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
  filterClick(e) {
    // Set Timezone
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
    this.policiesFilter.pageIndex=event.first / event.rows;
    this.policiesFilter.pageSize=event.rows;
    this.policiesFilter.isExcel=false;
    this._adminPolicyService.getSuccessPolicyWithFilter(this.policiesFilter)
    .subscribe((data: CommonResponse<PolicyListing[]>) => {
        this.policyListing = data.data;
        this.SuccessPoliciesCount = data.totalCount;
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

  showResendPolicyEmailPopup(policy) {
    this.resendPolicyModel = policy
    this.currentCheckoutEmail = this.resendPolicyModel.checkoutEmail;
    this.openPpUp = true;
  }

  // When the user clicks on <span> (x) or close button to close the modal
  closeEmailModal(){
    this.openPpUp = false;
  }

 reSendPolicyByEmail() {
    this.clicked = true;
    this.loading = true;

    const langCode = (this.isEnglish) ? 2 : 1;
    this._adminPolicyService.reSendPolicyByMail(this.currentCheckoutEmail, this.resendPolicyModel.policyNo
        , this.resendPolicyModel.policyFileId, this.resendPolicyModel.referenceId, langCode).subscribe((data: CommonResponse<boolean>) => {
          console.log('reSendPolicyByEmail --> data');
          console.log(data);
          if (data.data === true) {
            this.loading = false;
            this._toastrService.success((this.isEnglish) ? 'Policy is resent successfully' : 'تم إعادة إرسال الوثيقة بنجاح');
          } else {
            this._toastrService.error((this.isEnglish) ? 'An error occurred while resending the Policy' : 'حدث خطأ أثناء إعادة إرسال الوثيقة');
          }
          this.clicked = false;
          this.loading = false;
          this.openPpUp = false;
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
}
