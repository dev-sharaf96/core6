import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminPolicyService } from 'src/app/core/services/admin-policy.service';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import { FailurePolicies } from '../../failure-policies/failure-policies';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { PolicyStatusEnum } from 'src/app/core/models/policy-status.enum';
import { StatusPolicies } from '../policies-status';
import { ToastrService } from 'ngx-toastr';
import { SuccessPolicies } from '../../success-policies/success-policies';

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.css']
})
export class StatusDetailsComponent implements OnInit {

  policy: SuccessPolicies = new SuccessPolicies();
  failedPolicy: FailurePolicies = new FailurePolicies();

  isEn: boolean;
  PolicyStatusEnum = PolicyStatusEnum;
  //isDetails:boolean=true;
  status:any

    constructor(
      private _adminPolicyService: AdminPolicyService,
      private _router: Router,
      private route: ActivatedRoute,
      private _localizationService: LocalizationService, private _toastrService: ToastrService) { }
    ngOnInit() {
      this.isEn = this._localizationService.getCurrentLanguage().id === 2;
      const ref = this.route.snapshot.paramMap.get('ref');
      const status = this.route.snapshot.paramMap.get('status');
     this.status=status;   

      if(status == PolicyStatusEnum.Available.toString()){
      this._adminPolicyService.getSuccessDetails(ref).subscribe((data: CommonResponse<SuccessPolicies>) => {
        this.policy = data.data;
        // this.policy.policyStatus.name = this.isEn ? this.policy.policyStatus.nameEn : this.policy.policyStatus.nameAr;
        // this.policy.productType.desc = this.isEn ?
        //  this.policy.productType.descEN :
        //   this.policy.productType.descAR;
        }, (error) => error);
      }
      else{
        this._adminPolicyService.getFailDetails(ref).subscribe((data: CommonResponse<FailurePolicies>) => {
        this.failedPolicy = data.data;
        this.failedPolicy.insuredFullName = this.isEn ? this.failedPolicy.insuredFullNameEn : this.failedPolicy.insuredFullNameAr;
        this.failedPolicy.insuranceCompany = this.isEn ? this.failedPolicy.insuranceCompanyEn : this.failedPolicy.insuranceCompanyAr;
        this.failedPolicy.policyStatus.name = this.isEn ? this.failedPolicy.policyStatus.nameEn : this.failedPolicy.policyStatus.nameAr;
        this.failedPolicy.productType.desc = this.isEn ?
         this.failedPolicy.productType.descEN :
          this.failedPolicy.productType.descAR;
        }, (error) => error);
      }
  }

}
