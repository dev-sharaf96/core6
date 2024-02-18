import { Component, OnInit } from '@angular/core';
import { CommonResponse, CheckoutResponse, PaymentService } from '../core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutDetails: CheckoutResponse;
  constructor(private _route: ActivatedRoute, private _paymentService: PaymentService) {
    this._route.data.pipe(map(data => data.details)).subscribe((data: CommonResponse<CheckoutResponse>) => {
      this.checkoutDetails = data.data;
      this._paymentService.checkoutDetails = data.data;
    });
  }

  ngOnInit() { }
}
