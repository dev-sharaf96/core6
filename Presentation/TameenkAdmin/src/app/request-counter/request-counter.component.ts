import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../core/services/policy.service';
import { CommonResponse, IPolicy, AdminPolicyService } from '../core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

/**
 * The request counter component
 *
 * @export
 * @class RequestCounterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-request-counter',
  templateUrl: './request-counter.component.html',
  styleUrls: ['./request-counter.component.css']
})
export class RequestCounterComponent implements OnInit {
  pageSize = 10;
  failurePolicis: IPolicy[];
  failurePolicisLoading: boolean;
  failurePolicisRecords = 0;

  maxTriesPolicies: IPolicy[];
  maxTriesPoliciesLoading: boolean;
  maxTriesPoliciesRecords = 0;

  closedRequests: IPolicy[];
  closedLoading: boolean;
  closedtotalRecords = 0;

  confirmSubject: Subject<string> = new Subject();

  /**
   * @constructor Creates an instance of RequestCounterComponent.
   * @param {PolicyService} _policyService
   * @param {TranslateService} translate
   * @memberof RequestCounterComponent
   */
  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _policyService: PolicyService,
    private _toastrService: ToastrService) { }

  /**
   *
   *
   * @memberof RequestCounterComponent
   */
  ngOnInit() {
    this.closedRequests = [];
    this.failurePolicis = [];
    this.closedLoading = true;
    this.failurePolicisLoading = true;
  }


  /**
   * load Pending Requests data from two sources
   *  1- Policies with failure status
   *  2- failure Policies with max Tries and can re issue
   *
   * @param {*} event
   * @memberof RequestCounterComponent
   */
  lazyFailurePolicis(event) {
    this.failurePolicisLoading = true;
    this._policyService
      .getFailurePolicis(event.first / event.rows, event.rows
      )
      .subscribe(
        (data: CommonResponse<IPolicy[]>) => {
          if (data.data) {
            this.failurePolicisRecords = data.totalCount;
            this.failurePolicis = data.data;
            this.failurePolicisLoading = false;
          }
        },
        (error: any) => {
          this.failurePolicisLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }
  /**
   * Load MaxTries Policies
   *
   * @param {*} event
   * @memberof RequestCounterComponent
   */
  lazyMaxTriesPolicies(event) {
    this._policyService
      .getMaxTriesPolicies(
        `GetExceededMaxTriesPolicies?pageIndex=${event.first / event.rows}&pageSize=${event.rows}`
      )
      .subscribe(
        (data: CommonResponse<IPolicy[]>) => {
          if (data.data) {
            this.maxTriesPoliciesRecords = data.totalCount;
            this.maxTriesPolicies = data.data;
            this.maxTriesPoliciesLoading = false;
          }
        },
        (error: any) => {
          this.maxTriesPoliciesLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  /**
   * Load Closed Requests
   *
   * @param {*} event
   * @memberof RequestCounterComponent
   */
  lazyClosedRequests(event) {
    this.reloadClosedRequests(event.first / event.rows, event.rows);
  }



  /**
   * Re Issue Policy
   *
   * @param {*} referenceId
   * @memberof RequestCounterComponent
   */
  setPolicyTries(referenceId: string) {
    this._adminPolicyService
      .setPolicyTries(referenceId)
      .subscribe(
        (data: any) => {
          // console.log(data);
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

  /**
   * Policy Refund button click event
   * @param referenceId  Checkout reference Id
   */
  policyRefundClick(referenceId: string): void {
    this.confirmSubject.next(referenceId);
  }
  /**
   * Refund policy after user confirmation
   * @param referenceId Checkout Id
   */
  refundPolicy(referenceId: string): void {
    this.closedLoading = true;
    this._policyService.refundPolicy(referenceId).subscribe(
      (data: CommonResponse<boolean>) => {
        this.closedLoading = false;
        this.reloadClosedRequests(0, this.pageSize);
      },
      (error: any) => {
        this.closedLoading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  //#region Private methods

  /**
* Reload Closed Requests table's data
* @param pageIndex Page index
* @param pageSize Page size
*/
  private reloadClosedRequests(pageIndex: number, pageSize: number) {
    this.closedLoading = true;
    this._policyService
      .getClosedPolicis(
        `pageIndex=${pageIndex}&pageSize=${pageSize}`
      )
      .subscribe(
        (data: CommonResponse<IPolicy[]>) => {
          this.closedtotalRecords = data.totalCount;
          this.closedRequests = data.data;
          this.closedLoading = false;
        },
        (error: any) => {
          this.closedLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  //#endregion

}
