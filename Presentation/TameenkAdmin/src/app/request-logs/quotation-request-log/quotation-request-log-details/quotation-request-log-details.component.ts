import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import { QuotationRequestLogModel } from '../quotation-request-log-model';
import { RequestLogsService } from 'src/app/core/services/requestLogs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotation-request-log-details',
  templateUrl: './quotation-request-log-details.component.html',
  styleUrls: ['./quotation-request-log-details.component.css']
})
export class QuotationRequestLogDetailsComponent implements OnInit {

  quotationRequestLogModel: QuotationRequestLogModel = new QuotationRequestLogModel();

  constructor(private _requestLogsService: RequestLogsService,
    private route: ActivatedRoute,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this._requestLogsService.getQuotationRequestLogDetails(id)
      .subscribe((data: CommonResponse<QuotationRequestLogModel>) => {
          this.quotationRequestLogModel = data.data;
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
