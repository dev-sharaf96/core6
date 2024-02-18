
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService, CommonResponse, InsuranceCompanyService, Promotion , InsuranceCompany } from 'src/app/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  insuranceCompanies: any;
  status;
  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  ngOnInit() {
    this._insuranceCompanyService.getInsuranceCompaniesName().subscribe((data) => {
      this.insuranceCompanies = [];
      this.insuranceCompanies = data.data;
      // this.promotions.unshift({id: null, nameAr: 'الكل', nameEn: 'all'});
      // this.promotions.forEach((status) => {
      //   status.name = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      //   ? status.nameEn
      //   : status.nameAr;
      // });
      // this.status = this.promotions.find((status) => status.id === this.selectedValue);
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
