import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceCompanyService, CommonResponse, IIdNamePairModel, LocalizationService } from '../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shared-insurance-companies',
  templateUrl: './insurance-companies.component.html',
  styleUrls: ['./insurance-companies.component.css']
})
export class InsuranceCompaniesComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  companies: IIdNamePairModel[];
  company = new IIdNamePairModel();
  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  ngOnInit() {
    this._insuranceCompanyService.getInsuranceCompaniesName().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.companies = [];
      this.companies = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.companies.unshift({id: null, name: 'all'})
      : this.companies.unshift({id: null, name: 'الكل'});
      this.company = this.companies.find((c) => c.id === this.selectedValue);
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  changed() {
    this.selectedValue = this.company.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
