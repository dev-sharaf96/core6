import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceCompanyService, IIdNamePairModel, CommonResponse, LocalizationService, PolicyService, NajmStatus, AdminPolicyService } from '../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-najm-status',
  templateUrl: './najm-status.component.html',
  styleUrls: ['./najm-status.component.css']
})
export class NajmStatusComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  najm: NajmStatus[];
  status = new NajmStatus;
  constructor(
    private _policyService: PolicyService,
    private _adminPolicyService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  ngOnInit() {
    this._adminPolicyService.getAllNajmStatus().subscribe((data: CommonResponse<NajmStatus[]>) => {
      this.najm = [];
      this.najm = data.data;
      this.najm.unshift({id: null, nameAr: 'الكل', nameEn: 'all'});
      this.najm.forEach((status) => {
        status.name = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? status.nameEn
        : status.nameAr;
      });
      this.status = this.najm.find((status) => status.id === this.selectedValue);
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  changed() {
    this.selectedValue = this.status.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
