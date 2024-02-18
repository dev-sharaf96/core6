import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService, CheckoutResponse } from 'src/app/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  checkoutDetails: CheckoutResponse;
  paymentMethods: number[] = [];
  @ViewChild('PayForm') PayForm: ElementRef;
  KeyValues: any;
  constructor(private _router: Router, private _paymentService: PaymentService) {
    // if (this._paymentService.checkoutDetails) {
    //   this.checkoutDetails = this._paymentService.checkoutDetails;
    // } else {
    //   this._paymentService.checkoutDetailsOb.subscribe(data => {
    //     this.checkoutDetails = data.data;
    //   });
    // }
    // this._paymentService.GetPaymentMethods().subscribe(methods => {
    //   this.paymentMethods = methods.data;
    // });
  }

  ngOnInit() {
    this._paymentService.GetPaymentMethods().subscribe(methods => {
      this.paymentMethods = methods.data;
    });
    this.checkoutDetails = this._paymentService.checkoutDetails;
  }
  submitChekout(code) {
    this.checkoutDetails.paymentMethodCode = code;
    this._paymentService.SubmitCheckoutDetails(this.checkoutDetails).subscribe(data => {
      // Payfort
      if (this.checkoutDetails.paymentMethodCode === 1) {
        this.KeyValues = data.data;
        setTimeout(() => {
          this.PayForm.nativeElement.submit();
        }, 100);
      } else if (this.checkoutDetails.paymentMethodCode === 3) {
        window.location.href = data.data;
      } else if (this.checkoutDetails.paymentMethodCode === 2) {
        this._paymentService.SadadData = data.data;
       this._router.navigate(['/checkout/payment-method/sadad'], {
          queryParams: { referenceId: this.checkoutDetails.referenceId, RequestId: this.checkoutDetails.qtRqstExtrnlId },
          queryParamsHandling: 'merge'
        });
      }
    }, (error) => {
      this._router.navigate(['/checkout/error'],
        {
          queryParams: { referenceId: this.checkoutDetails.referenceId, RequestId: this.checkoutDetails.qtRqstExtrnlId },
          queryParamsHandling: 'merge'
        });
    });
  }
  // sadadPayment() {
  //   this._router.navigate(['/checkout/payment-method/sadad']);
  // }
  // payfortPayment() {
  //   this._router.navigate(['/checkout/purchased']);
  // }
}
