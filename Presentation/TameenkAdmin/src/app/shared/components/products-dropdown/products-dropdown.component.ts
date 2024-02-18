import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceCompanyService, IIdNamePairModel, CommonResponse, LocalizationService } from '../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-dropdown',
  templateUrl: './products-dropdown.component.html',
  styleUrls: ['./products-dropdown.component.css']
})
export class ProductsDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  products: IIdNamePairModel[];
  product = new IIdNamePairModel();

  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  ngOnInit() {
    this._insuranceCompanyService.getAllProductsType().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.products = [];
      this.products = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.products.unshift({id: null, name: 'all'})
      : this.products.unshift({id: null, name: 'الكل'});
      this.product = this.products.find((p) => p.id === this.selectedValue);
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  changed() {
    this.selectedValue = this.product.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
