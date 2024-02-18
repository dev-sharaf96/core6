import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalizationService } from 'src/app/core';
import { IProductBenefit } from 'src/app/core/models/product-benefit.model';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {
  @Input() benefits: IProductBenefit[];
  @Output() benefitChange = new EventEmitter();
  benefitsList = {
    0: 'pin',
    1: 'svg-driver',
    2: 'driver-passenger',
    3: 'geographic-coverage',
    4: 'theft-fire-frontglass',
    5: 'roadside-assistance',
    6: 'car-replacement',
    7: 'AgencyRepairs',
    8: 'svg-noclaim',
    9: 'geographicbahrain-coverage',
    10: 'geographicbahraingcc-coverage',
    11: 'geographicbahrainnorth-coverage',
    12: 'waiver',
    13:'theft-fire-frontglass'
  };
  isOverWeight = false;
  isFull = false;
  constructor(private _localizationService: LocalizationService) {}
  ngOnInit() {
    this.isOverWeight = this.benefits.length > 4;
    this.benefits.forEach(v => {
      v.benefit.benefitDescription =
        this._localizationService.getCurrentLanguage().id === 2
          ? v.benefit.englishDescription
          : v.benefit.arabicDescription;
    });
  }
  /**
   * Toggle benefit & VAT
   * changeSelected()
   * @param id
   * @param priceValue
   */
  changeSelected(index) {
    if (!this.benefits[index].isReadOnly && !this.benefits[index].isDisabled) {
      this.benefits[index].isSelected = !this.benefits[index].isSelected;
      if (this.benefits[index].benefit.code === 2) {
        if (this.benefits[index].isSelected) {
          const driverCoverage =
            this.benefits.find(b => b.benefit.code === 1) || new IProductBenefit();
          driverCoverage.isSelected = false;
          driverCoverage.isDisabled = true;
          const passengersCoverage =
            this.benefits.find(b => b.benefit.code === 8) || new IProductBenefit();
          passengersCoverage.isSelected = false;
          passengersCoverage.isDisabled = true;
        } else {
          const driverCoverage =
            this.benefits.find(b => b.benefit.code === 1) || new IProductBenefit();
          driverCoverage.isDisabled = false;
          const passengersCoverage =
            this.benefits.find(b => b.benefit.code === 8) || new IProductBenefit();
          passengersCoverage.isDisabled = false;
        }
      }
      let benefitsValue = 0;
      let benefitsVat = 0;
      this.benefits
        .filter(b => b.isSelected)
        .forEach(benefit => {
          benefitsValue += benefit.benefitPrice * 1.05;
          benefitsVat += benefitsValue - benefit.benefitPrice;
        });
      this.benefitChange.emit({
        benefitsValue: benefitsValue,
        benefitsVat: benefitsVat
      });
    }
  }
}
