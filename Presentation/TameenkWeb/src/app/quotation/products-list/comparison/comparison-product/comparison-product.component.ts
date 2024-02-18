import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comparison-product',
  templateUrl: './comparison-product.component.html',
  styleUrls: ['./comparison-product.component.css']
})
export class ComparisonProductComponent implements OnInit {
@Input() product;
@Input() quotationRequestId;
@Output() getCheckout = new EventEmitter();
  constructor(private _PaymentService: PaymentService, private _router: Router) { }

  ngOnInit() {
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
