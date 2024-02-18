import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CheckoutRequestLogModel } from '../checkout-request-log-model';
import { CommonResponse } from 'src/app/core';
import { RequestLogsService } from 'src/app/core/services/requestLogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-request-log-details',
  templateUrl: './checkout-request-log-details.component.html',
  styleUrls: ['./checkout-request-log-details.component.css']
})
export class CheckoutRequestLogDetailsComponent implements OnInit {
  checkoutRequestLogModel: CheckoutRequestLogModel = new CheckoutRequestLogModel();

  constructor(private _requestLogsService: RequestLogsService,
    private route: ActivatedRoute,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this._requestLogsService.getCheckoutRequestLogDetails(id)
      .subscribe((data: CommonResponse<CheckoutRequestLogModel>) => {
          this.checkoutRequestLogModel = data.data;
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
