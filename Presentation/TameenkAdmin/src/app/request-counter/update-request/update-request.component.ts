import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from '../../core/services';
import { CommonResponse, IUpdateRequest } from '../../core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {
  display = false;
  uploadLoading = false;

  status: string;
  id;
  policyId;
  policyUpdateRequestId;

  updateRequestData: IUpdateRequest[];
  updateRequestLoading: boolean;
  updateRequestTotalRecords: number;

  /**
   * Creates an instance of UpdateRequestComponent.
   * @param {PolicyService} _policyService
   * @param {Router} router
   * @memberof UpdateRequestComponent
   */
  constructor(private _policyService: PolicyService, private router: Router, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.updateRequestLoading = true;
  }
  /**
   * set update request change
   *
   * @param {*} status
   * @param {*} id
   * @memberof UpdateRequestComponent
   */
  setUpdateRequestChange(status, id) {
    this._policyService.setUpdateRequestChange(`id=${id}&status=${status}`).subscribe(
      (data: CommonResponse<IUpdateRequest[]>) => {
        this.updateRequestTotalRecords = data.totalCount;
        this.updateRequestData = data.data;
        this.updateRequestLoading = false;
        this.router.navigateByUrl('/notif_center', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/update_request']));
      },
      (error: any) => {
        this.updateRequestLoading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  /**
   * load update request
   *
   * @param {*} event
   * @memberof UpdateRequestComponent
   */
  updateRequestLazyLoad(event) {
    this.updateRequestLoading = true;
    this._policyService.getUpdateRequest(`pageIndex=${event.first / event.rows}&pageSize=${event.rows}`).subscribe(
      (data: CommonResponse<IUpdateRequest[]>) => {
        this.updateRequestTotalRecords = data.totalCount;
        this.updateRequestData = data.data;
        this.updateRequestLoading = false;
      },
      (error: any) => {
        this.updateRequestLoading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  /**
   * show popup message
   *
   * @param {*} status
   * @param {*} id
   * @param {*} policyId
   * @param {*} policyUpdateRequestId
   * @memberof UpdateRequestComponent
   */
  showDialog(status, id, policyId, policyUpdateRequestId) {
    if (policyId) {
      this.policyId = policyId;
    }
    if (policyUpdateRequestId) {
      this.policyUpdateRequestId = policyUpdateRequestId;
    }
    this.display = true;
    this.status = status;
    this.id = id;
  }
}
