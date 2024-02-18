import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse, InsuranceCompanyService, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { PolicyListing } from '../policies-listing';
import { PolicyStatisticsFilter } from './Models/PolicyStatisticsFilter';
import { PolicyStatisticsOutput } from './Models/PolicyStatisticsOutput';
import { PolicyStatisticsResutlOutput } from './Models/PolicyStatisticsResutlOutput';
import { RequestsService } from 'src/app/core/services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy-statistics-report',
  templateUrl: './policy-statistics-report.component.html',
  styleUrls: ['./policy-statistics-report.component.css']
})
export class PolicyStatisticsReportComponent implements OnInit {

    policiesFilter: PolicyStatisticsFilter;
    policyListing: PolicyStatisticsResutlOutput;
    totalPoliciesCount;
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
    resendPolicyModel: PolicyListing;
    clicked: boolean = false;
    isSearch = false;
    
    constructor(
      private _RequesService: RequestsService,
      private _insuranceCompanyService: InsuranceCompanyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService) { }
    
      ngOnInit() {
        this.policiesFilter = this._RequesService.policiesFilter;
        
        this.policiesFilter.startDate = this.today;
        this.policiesFilter.endDate = this.today;
        this.loading = true;
        this.firstTime = true;
        this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    
      }
    
      exportCsv() {
        this.policiesFilter.isExcel=1;
        if (this.policiesFilter.startDate) {
          this.policiesFilter.startDate.setHours(
            this.policiesFilter.startDate.getHours() - this.policiesFilter.startDate.getTimezoneOffset() / 60);
        }
        if (this.policiesFilter.endDate) {
          this.policiesFilter.endDate.setHours(
            this.policiesFilter.endDate.getHours() - this.policiesFilter.endDate.getTimezoneOffset() / 60);
        }
        this._RequesService.getPolicyStatisticsWithFilter(this.policiesFilter).subscribe((data) => {
          if (data.data) {
            FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
             'Success-Policies.xlsx');
          }
        });
        this.policiesFilter.isExcel=0;
      }

      filterClick(e) {
       // this.policiesFilter.productTypeId=2; //add value of product value
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
        if (this.isEnglish) {
          this.policiesFilter.lang = "en";
        } else {
          this.policiesFilter.lang = "ar";
        }
        console.log(this.policiesFilter);
        e.reset();
      }
      PoliciesStatistcsLazyLoad(event) {
        this.eventHolder = event;
        this.loading = true;
        this.policiesFilter.pageNumber = (event.first / event.rows)+1;
        this.policiesFilter.pageSize = event.rows;
        this._RequesService.getPolicyStatisticsWithFilter(this.policiesFilter)
        .subscribe((data: CommonResponse<PolicyStatisticsResutlOutput>) => {
            this.policyListing = data.data;
            this.totalPoliciesCount = this.policyListing.TotalCount;
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
