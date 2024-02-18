import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ElementRef } from '@angular/core';
import { IProduct, LocalizationService, PaymentService } from 'src/app/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { InsuranceTypes } from 'src/app/core/enums/insurance-types.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() product: IProduct;
  @Input() quotationRequestId: string;
  @Input() companyInfo;
  @Input() comparProducts;
  @Output() getCompany = new EventEmitter();
  @Output() addProductToCompare = new EventEmitter();
  @Output() deletedProduct = new EventEmitter();
  @Output() getCheckout = new EventEmitter();
  isEnglish = this._localizationService.getCurrentLanguage().id === 2;
  popupIsActive = false;
  insuranceType: string;
  isAddedToCompare = false;
  insuranceTypes = InsuranceTypes;
  productPrice: number;
  vatValue: number;
  constructor(
    private _localizationService: LocalizationService,
    private el: ElementRef,
    private _PaymentService: PaymentService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.productPrice = this.product.productPrice;
    this.vatValue = this.product.priceDetails.find(c => c.priceTypeCode === 8).priceValue || 0;
    if (this.product.priceDetails && this.product.priceDetails.length > 0) {
      this.product.priceDetails.sort((a, b) => a.priceTypeCode - b.priceTypeCode);
      const tmp = this.product.priceDetails[this.product.priceDetails.length - 2];
      this.product.priceDetails[this.product.priceDetails.length - 2] = this.product.priceDetails[0];
      this.product.priceDetails[0] = tmp;
      this.product.priceDetails.forEach(v => {
        v.priceType.priceDescription =
          this._localizationService.getCurrentLanguage().id == 2
            ? v.priceType.englishDescription
            : v.priceType.arabicDescription;
      });
    }
  }
  ngOnChanges() {
    this.isAddedToCompare = this.comparProducts.some(el => {
      return el.id === this.product.id;
    });
  }
  benefitChange(benefit) {
    this.productPrice = this.product.productPrice + benefit.benefitsValue;
    const vat = this.product.priceDetails.find(c => c.priceTypeCode === 8) || {priceValue: 0};
    vat.priceValue = this.vatValue + benefit.benefitsVat;
  }
  showPopup($this) {
    this.getCompany.emit(this.product.providerId);
    $('[data-popup="' + $this + '"]').fadeIn(350);
    this.popupIsActive = true;
  }
  hidePopup() {
    this.popupIsActive = false;
  }
  addToCompare() {
    if (!this.isAddedToCompare) {
      this.isAddedToCompare = true;
      this.addProductToCompare.emit(this.product);
    }
  }
  removeFromCompare() {
    this.deletedProduct.emit(this.product);
  }
  showBenefits() {
    $(this.el.nativeElement)
      .find('.product-benefits')
      .slideToggle();
  }
  buyProduct() {
    const selectedProductBenefitId = [];
    this.product.productBenefits.forEach(benefit => {
      if (benefit.isSelected) {
        selectedProductBenefitId.push(benefit.id);
      }
      return benefit.isSelected === true;
    });
    const productInfo = new ProductInfo(
      this.quotationRequestId,
      this.product.referenceId,
      this.product.id,
      selectedProductBenefitId
    );
    this.getCheckout.emit(true);
    this._PaymentService.addItemToCart(productInfo).subscribe(data => {
      this._router.navigate(['/checkout'], { queryParams: { referenceId: data.data.referenceId, RequestId: data.data.qtRqstExtrnlId },
        queryParamsHandling: 'merge'
      });
    }, (error) => {
    this.getCheckout.emit(false);
      return error;
    });
  }
}
export class ProductInfo {
  constructor(
    quotationRequestId,
    referenceId,
    productId,
    selectedProductBenefitId
  ) {
    (this.QuotaionRequestExternalId = quotationRequestId),
      (this.ReferenceId = referenceId),
      (this.ProductId = productId),
      (this.SelectedProductBenefitId = selectedProductBenefitId);
  }
  QuotaionRequestExternalId;
  ReferenceId;
  ProductId;
  SelectedProductBenefitId: number[];
}
