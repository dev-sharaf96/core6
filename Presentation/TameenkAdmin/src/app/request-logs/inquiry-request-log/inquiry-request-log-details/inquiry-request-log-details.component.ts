import { ActivatedRoute, Router } from '@angular/router';
import { CommonResponse, RequestLogsService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { InquiryRequestLogModel } from '../inquiry-request-log-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inquiry-request-log-details',
  templateUrl: './inquiry-request-log-details.component.html',
  styleUrls: ['./inquiry-request-log-details.component.css']
})
export class InquiryRequestLogDetailsComponent implements OnInit {

  inquiryRequestLogModel: InquiryRequestLogModel = new InquiryRequestLogModel();

  constructor(private _requestLogsService: RequestLogsService,
    private route: ActivatedRoute,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this._requestLogsService.getInquiryRequestLogDetails(id)
      .subscribe((data: CommonResponse<InquiryRequestLogModel>) => {
          this.inquiryRequestLogModel = data.data;
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
