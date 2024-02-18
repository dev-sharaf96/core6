import { ActivatedRoute, Router } from '@angular/router';
import { CommonResponse, HyperPayResponse, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { Payment } from '../payments-model';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {
  payment: Payment;
  hyperPayResponse: HyperPayResponse = new HyperPayResponse();
  referenceId: string;
  constructor(
    private _paymentsService: PaymentsService,
    private _router: Router,
    private route: ActivatedRoute,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    const ref = this.route.snapshot.paramMap.get('ref');
    this._paymentsService.getFailDetails(ref).subscribe((data: CommonResponse<Payment>) => {
      this.payment = data.data;
      this.referenceId = this.payment.ReferenceId;
      // this.policy.insuredFullName = this.isEn ? this.policy.insuredFullNameEn : this.policy.insuredFullNameAr;
      // this.policy.insuranceCompany = this.isEn ? this.policy.insuranceCompanyEn : this.policy.insuranceCompanyAr;
      // this.policy.policyStatus.name = this.isEn ? this.policy.policyStatus.nameEn : this.policy.policyStatus.nameAr;
      // this.policy.productType.desc = this.isEn ?
      //  this.policy.productType.descEN :
      //   this.policy.productType.descAR;
    }, (error) => error);
  }

  onSubmit() {
    this.hyperPayResponse.referenceId = this.referenceId;
 
    this._paymentsService.reproccessFail(this.hyperPayResponse).subscribe(data => {
     
      if (data.data) {
        this._router.navigate(['/admin/payments']);

        this._translate.get('common.reproccess_success').subscribe(res => {
          this._toastrService.success(res);
        });
      }
      else {
        this._translate.get('common.reproccess_fail').subscribe(res => {
          this._toastrService.error(res);
        });
      }

    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
}
