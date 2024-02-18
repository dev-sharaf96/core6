import { Component, OnInit } from '@angular/core';
import { SamaReportFilter } from './sama-report-filter';
import { SamaReportListing } from './sama-report-listing';
import * as FileSaver from 'file-saver';
import { CommonResponse, LocalizationService, InsuranceCompanyService, AdminPolicyService } from '../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sama-report',
  templateUrl: './sama-report.component.html',
  styleUrls: ['./sama-report.component.css']
})
export class SamaReportComponent implements OnInit {
  samaFilter: SamaReportFilter = new SamaReportFilter();
  samaListing: SamaReportListing[] = [];
  SuccessPoliciesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  selectedPolicy;
  SuccessPoliciesExcel = [];
  today = new Date();
  currentCheckoutEmail = '';
  isSearch = false;

  constructor(private _adminPolicyService: AdminPolicyService, private _toastrService: ToastrService,
              private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.samaFilter.startDate = this.today;
    this.samaFilter.endDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  exportCsv() {
    if (this.samaFilter.startDate) {
      this.samaFilter.startDate.setHours(
        this.samaFilter.startDate.getHours() - this.samaFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.samaFilter.endDate) {
      this.samaFilter.endDate.setHours(
        this.samaFilter.endDate.getHours() - this.samaFilter.endDate.getTimezoneOffset() / 60);
    }

    const lang = this.isEnglish ? 'en' : 'ar';
    this._adminPolicyService.exportSamaReportExcel(this.samaFilter, lang).subscribe((data) => {
      if (data.data) {
        FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
         'Success-Policies.xlsx');
      }
    });
  }

  filterClick(e) {
    // Set Timezone
    this.isSearch = true;
    if (this.samaFilter.startDate) {
      this.samaFilter.startDate.setHours(
        this.samaFilter.startDate.getHours() - this.samaFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.samaFilter.endDate) {
      this.samaFilter.endDate.setHours(
        this.samaFilter.endDate.getHours() - this.samaFilter.endDate.getTimezoneOffset() / 60);
    }
    e.reset();
  }
  SuccessPoliciesLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._adminPolicyService.getSamaReporPagetWithFilter(this.samaFilter, `pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<SamaReportListing[]>) => {
        this.samaListing = data.data;
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

}
