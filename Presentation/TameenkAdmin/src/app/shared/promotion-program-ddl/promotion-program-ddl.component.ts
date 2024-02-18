import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService, CommonResponse, PromotionService, Promotion } from 'src/app/core';

@Component({
  selector: 'app-promotion-program-ddl',
  templateUrl: './promotion-program-ddl.component.html',
  styleUrls: ['./promotion-program-ddl.component.css']
})
export class PromotionProgramDdlComponent implements OnInit {

  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  promotions: Promotion[];
  status = new Promotion;
  constructor(
    private _promotionService: PromotionService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  ngOnInit() {
    this._promotionService.getAllPromotion().subscribe((data: CommonResponse<Promotion[]>) => {
      this.promotions = [];
      this.promotions = data.data;
      // this.promotions.unshift({
      //   Id: null,
      //   nameAr: 'الكل',
      //  nameEn: 'all',
      //  Name: 'الكل',
      //  Description: null,
      //  EffectiveDate: null,
      //  DeactivatedDate: null,
      //  IsActive:null
      // });
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
    this.selectedValue = this.status.Id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
