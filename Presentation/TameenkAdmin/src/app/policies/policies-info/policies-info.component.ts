import { Component, OnInit } from '@angular/core';
import { PoliciesInfoModel } from './policies-info-model';
import { AdminPolicyService, LocalizationService, CommonResponse } from '../../core';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import { PoliciesInfoListingModel } from './policies-info-listing-model';

@Component({
  selector: 'app-policies-info',
  templateUrl: './policies-info.component.html',
  styleUrls: ['./policies-info.component.css']
})
export class PoliciesInfoComponent implements OnInit {
  policyInfoFilter: PoliciesInfoModel = new PoliciesInfoModel();
  policyListing: PoliciesInfoListingModel[];
  SuccessPoliciesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  currentCheckoutEmail = '';
  isSearch = false;

  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  exportCsv() {
    const lang = this.isEnglish ? 'en' : 'ar';
    this._adminPolicyService.exportSuccessPoliciesInfoAsExcel(this.policyInfoFilter, lang)
    .subscribe((data) => {
      if (data.data) {
        FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
         'Success-Policies.xlsx');
      }
    });
  }

  filterClick(e) {
    this.isSearch = true;
    e.reset();
  }
  SuccessPoliciesLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._adminPolicyService.getSuccessPoliciesInfoWithFilter(this.policyInfoFilter,
                                      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<PoliciesInfoListingModel[]>) => {
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
}
