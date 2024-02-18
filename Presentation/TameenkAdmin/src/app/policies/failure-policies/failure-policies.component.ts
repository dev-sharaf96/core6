import * as FileSaver from 'file-saver';

import {
  AdminPolicyService,
  CommonResponse,
  InsuranceCompanyService,
  LocalizationService,
  PolicyStatusEnum
} from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { FailureFilter } from './failure-filter';
import { FailurePolicies } from './failure-policies';
import { PolicyListing } from '../policies-listing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-failure-policies',
  templateUrl: './failure-policies.component.html',
  styleUrls: ['./failure-policies.component.css']
})
export class FailurePoliciesComponent implements OnInit {
  policiesFilter: FailureFilter;
  policyListing: PolicyListing[];
  FailurePoliciesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'CheckoutDetails.ReferenceId';
  isEnglish: boolean;
  selectedPolicies: string[] = [];
  selectedPolicy: FailurePolicies;
  selectAllValue = false;
  today = new Date();
  PolicyStatusEnum = PolicyStatusEnum;
  isSearch = false;

constructor(
    private _adminPolicyService: AdminPolicyService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.policiesFilter = this._adminPolicyService.failureFilter;
    this.policiesFilter.startDate = this.today;
    this.policiesFilter.endDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? true
        : false;
  }

  exportCsv() {
    this.policiesFilter.isExcel=true;
    if (this.policiesFilter.startDate) {
      this.policiesFilter.startDate.setHours(
        this.policiesFilter.startDate.getHours() - this.policiesFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.policiesFilter.endDate) {
      this.policiesFilter.endDate.setHours(
        this.policiesFilter.endDate.getHours() - this.policiesFilter.endDate.getTimezoneOffset() / 60);
    }
    this._insuranceCompanyService.exportFailPoliciesAsExcel(this.policiesFilter).subscribe((data) => {
      if (data.data) {
        FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
         'Failure-Policies.xlsx');
      }
    });
  }
  selectAll(e) {
    this.selectedPolicies = [];
    if (e) {
      this.policyListing.forEach(f => {
       // if (f.policyStatus.key === PolicyStatusEnum[PolicyStatusEnum.Pending]) {
          this.selectedPolicies.push(f.referenceId);
       // }
      });
    } else {
      this.selectedPolicies = [];
    }
  }
  resetTraies() {
    this.loading = true;
    this.selectedPolicies.forEach(ref => {
      this._adminPolicyService.setPolicyTries(ref).subscribe(data => {},
        (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
    });
    this.FailurePoliciesLazyLoad(this.eventHolder);
  }
  reDownloadPolicyFile(referenceId, name) {
    this.loading = true;
    this._adminPolicyService.reDownloadPolicyFile(referenceId).subscribe(
      (data: CommonResponse<string>) => {
        if (data.data) {
          FileSaver.saveAs('data:application/pdf;base64,' + data.data, name + '.pdf');
        }
        this.FailurePoliciesLazyLoad(this.eventHolder);
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
        this.FailurePoliciesLazyLoad(this.eventHolder);
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
  filterClick(e) {
    // Set Timezone
    this.isSearch = true;
    this.policiesFilter.startDate = new Date(this.policiesFilter.startDate.setHours(this.today.getHours(),this.today.getMinutes(),this.today.getSeconds()));
    this.policiesFilter.endDate= new Date( this.policiesFilter.endDate.setHours(this.today.getHours(),this.today.getMinutes(),this.today.getSeconds()));
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

  FailurePoliciesLazyLoad(event) {
    if (
      event.sortField === 'insuredFullNameAr' ||
      event.sortField === 'insuredFullNameEn'
    ) {
      this.policyListing = this.policyListing.sort((a, b) => {
        if (event.sortOrder === 1) {
          return a[event.sortField].localeCompare(b[event.sortField]);
        } else {
          return b[event.sortField].localeCompare(a[event.sortField]);
        }
      });
      return;
    }
    this.selectAll(false);
    this.selectAllValue = false;
    this.eventHolder = event;
    this.loading = true;
    this.policiesFilter.pageIndex=event.first / event.rows;
    this.policiesFilter.pageSize=event.rows;
    this.policiesFilter.sortOrder=event.sortOrder === 1 ? true : false;
    this._adminPolicyService
      .getFailurePolicyWithFilter(this.policiesFilter).subscribe((data: CommonResponse<PolicyListing[]>) => {
          this.policyListing = data.data;
          this.FailurePoliciesCount = data.totalCount;
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
        }
      );
  }
}
