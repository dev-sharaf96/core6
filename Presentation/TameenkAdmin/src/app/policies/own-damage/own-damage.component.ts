    import * as FileSaver from 'file-saver';

import { AdminPolicyService, InsuranceCompanyService, LocalizationService } from 'src/app/core';
import { CheckoutsService, CommonResponse } from 'src/app/core';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FilterModel } from './Models/FilterModel';
import { OutputModel } from './Models/OutputModel';
import { PolicyCheckoutFilter } from '../checkout-policies/checkout-policies-filter';
import { PolicyCheckoutModel } from '../checkout-policies/checkout-policies-model';
import { PolicyListing } from '../policies-listing';
import { SelectItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { data } from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';
import { outputsModel } from 'src/app/policies/renwal-policies/Models/outputsModel';
import { result } from './../renwal-policies/Models/result';

@Component({
  selector: "app-own-damage",
  templateUrl: "./own-damage.component.html",
  styleUrls: ["./own-damage.component.css"],
})
export class OwnDamageComponent implements OnInit {
  policiesFilter: FilterModel = new FilterModel();
  isSubmit: boolean = false;
  loading2: boolean = false;
  adminOutPut: any;
  policyListings: any;
  selectedRef: string[] = [];
  cols: any;
  Output: OutputModel;
  result: any;
  policyListing: any = [];
  selectedTickets: string[] = [];
  SuccessPoliciesCount;
  // maxdate;
  checked: boolean = false;
  loading: boolean = false;
  disableSendBtn: boolean = true;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  defaultSortField = "policyNo";
  isEnglish: boolean;
  selectedPolicy;
  SuccessPoliciesExcel = [];
  today = new Date();
  currentCheckoutEmail = "";
  openPpUp: boolean = false; //default value for resend modal
  clicked: boolean = false;
  isSearch = false;
  insuredType: SelectItem[];
  manufacturingYears: any[] = [];
  currentYear: number = new Date().getFullYear();

  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.isSubmit = false;
    this.loading = false;
    this.checked = false;
    this.policiesFilter.startDate = this.today;
    this.policiesFilter.endDate = this.today;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en" ? true : false;
    this.policiesFilter.lang = this.isEnglish ? "en" : "ar";
    this.generateManufacturingYears(1900, this.currentYear + 1);
  }

  filterClick(e) {
    // Set Timezone
    this.isSearch = true;
    this.isSubmit = true;
    if (this.policiesFilter.startDate) {
      this.policiesFilter.startDate.setHours(
        this.policiesFilter.startDate.getHours() -
          this.policiesFilter.startDate.getTimezoneOffset() / 60
      );
    }
    if (this.policiesFilter.endDate) {
      this.policiesFilter.endDate.setHours(
        this.policiesFilter.endDate.getHours() -
          this.policiesFilter.endDate.getTimezoneOffset() / 60
      );
    }
    e.reset();
  }
  OwnDamageLazyLoad(event) {
    this.eventHolder = event;
   this. policiesFilter.pageNumber = event.first /event.rows + 1;
    this. policiesFilter.pageSize = event.rows;
    this.loading = true;
    console.log(this.policiesFilter)
    this._adminPolicyService.getOwnDamagePolicy(this.policiesFilter).subscribe(
      (data: CommonResponse<OutputModel>) => {
        this.adminOutPut = data.data;
        this.Output = this.adminOutPut.Result;
        this.policyListing = this.Output.data;
        this.SuccessPoliciesCount = this.Output.totalCount;
        if(this.adminOutPut.ErrorCode == 1) {
          this.disableSendBtn = false;
        } else {
          this.disableSendBtn = true;
        }

        this.loading = false;
        this.isSearch = false;
      },
      (error: any) => {
        this.loading = false;
        this.isSearch = false;
        this.disableSendBtn = true;
        if (error.errors) {
          this.isSubmit = false;
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  sendSMS() {
    this.loading2 = true;
    this._adminPolicyService.sendOwnDamageMessage(this.policiesFilter).subscribe((data: CommonResponse<any>) => {
      if (data.data.ErrorCode == 1) {
        this._toastrService.success(data.data.ErrorDescription);
      } else {
        this._toastrService.error(data.data.ErrorDescription);
      }

      this.loading2 = false;
      this.isSearch = true;
      // this.firstTime = false;
    },
    (error: any) => {
      this.loading2 = false;
      // this.firstTime = false;
      this.isSearch = false;
      if (error.errors) {
        error.errors.forEach((item) => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  generateManufacturingYears(min, max) {
    this.manufacturingYears = [];
    for (let i = max; i >= min; i--) {
      this.manufacturingYears.push(i);
    }
  }
  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
  }
  // Hande() {
  //   this.maxdate.setDate(this.policiesFilter.startDate.getDate() + 10);
  //  // this.maxdate = this.policiesFilter.startDate;
  //   console.log(this.maxdate);
  // }
}
