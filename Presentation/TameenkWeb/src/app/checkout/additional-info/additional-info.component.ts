import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService, UserService, CommonResponse, CheckoutResponse, BankCode } from 'src/app/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  checkoutModel = {} as CheckoutResponse;
  bankName = '';
  mobilePattern = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  hasAgree = false;
  ibanIsValid = false;
  constructor(
    private _router: Router,
    private _paymentService: PaymentService
    ) { }

  ngOnInit() {
      this.checkoutModel = this._paymentService.checkoutDetails;
      if (this.checkoutModel.IBAN) {
        this.ibanValidate(this.checkoutModel.IBAN);
      }
  }

  validateAgreement(e) {
    this.hasAgree = e;
  }
  ibanValidate(e: string) {
    const ConcateTwoChars = e[0] + e[1];
    if (ConcateTwoChars.length === 2) {
      if (ConcateTwoChars.toLowerCase() !== 'sa') {
        this.ibanIsValid = false;
        return false;
      }
    }

    if (e.length !== 24) {
      this.ibanIsValid = false;
      this.bankName = '';
      return false;
    }

    const conc = parseInt(e[4] + e[5], 10);
    if (this.checkoutModel.bankCodes.some(b => parseInt(b.Id, 10) === conc)) {
      this.checkoutModel.bankCode = conc;
      this.bankName = this.checkoutModel.bankCodes.find((bank) => parseInt(bank.Id, 10) === conc)['Name'];
    } else {
      this.bankName = '';
    }
    if (conc !== this.checkoutModel.bankCode) {
      this.ibanIsValid = false;
      this.bankName = '';
      return false;
    }
    this.ibanIsValid = true;
  }
  OnSubmit(e) {
    if (e.valid) {
      this._paymentService.checkoutDetails = this.checkoutModel;
      this._router.navigate(['/checkout/payment-method'],
     { queryParams: { referenceId: this.checkoutModel.referenceId, RequestId: this.checkoutModel.qtRqstExtrnlId},
      queryParamsHandling: 'merge' });
    } else {
      console.log('not valid');
    }
  }
}
