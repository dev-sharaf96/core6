import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PolicyService, Payment } from '../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() policyUpdateRequestId;
  @Output() close = new EventEmitter();
  @Output() payment = new EventEmitter();
  paymentObj;
  constructor(private _policyService: PolicyService, private _toastrService: ToastrService) { }

  ngOnInit() { }
  closePopup() {
    this.close.emit();
  }
  addPayment(desc, amount) {
    this.paymentObj = new Payment();
    this.paymentObj.policyUpdateRequestId = this.policyUpdateRequestId;
    this.paymentObj.description = desc;
    this.paymentObj.amount = amount;
    this._policyService.addPayment(this.paymentObj , ``).subscribe(
      (res) => {
        this.payment.emit(3);
      },
      (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
}
