import { Component, OnInit } from '@angular/core';
import { CommonResponse, PolicyService, QuotationService, AuthService } from 'src/app/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  validPoliciesCount: number;
  expirePoliciesCount: number;
  policiesCount: number;
  billsCount: number;
  offersCount: number;
  UpdateRequestsCount: number;
  constructor(
    private _policyService: PolicyService,
    private _quotationService: QuotationService,
    private _authService: AuthService) { }

  ngOnInit() {
    this._policyService.getValidPoliciesCount(this._authService.getUserId()).subscribe((data: CommonResponse<number>) => {
      this.validPoliciesCount = data.data;
      this.policiesCount = this.validPoliciesCount + this.expirePoliciesCount;

    },
    (error: any) => error);
    this._policyService.getExpirePoliciesCount(this._authService.getUserId()).subscribe((data: CommonResponse<number>) => {
      this.expirePoliciesCount = data.data;
      this.policiesCount = this.validPoliciesCount + this.expirePoliciesCount;

    },
    (error: any) => error);
    this._policyService.getBillsCount(this._authService.getUserId()).subscribe((data: CommonResponse<number>) => {
      this.billsCount = data.data;
    },
    (error: any) => error);
    this._policyService.getUpdateRequestsCount(this._authService.getUserId()).subscribe((data: CommonResponse<number>) => {
      this.UpdateRequestsCount = data.data;
    },
    (error: any) => error);
    this._quotationService.getUserOffersCount(this._authService.getUserId()).subscribe((data: CommonResponse<number>) => {
      this.offersCount = data.data;
    },
    (error: any) => error);
  }
}
