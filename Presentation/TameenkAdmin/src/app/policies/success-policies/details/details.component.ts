import { Component, OnInit } from '@angular/core';
import { SuccessPolicies } from '../success-policies';
import { AdminPolicyService, LocalizationService, CommonResponse } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { log } from 'util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  policy: SuccessPolicies = new SuccessPolicies();
  isEn: boolean;
    constructor(
      private _adminPolicyService: AdminPolicyService,
      private _router: Router,
      private route: ActivatedRoute,
      private _localizationService: LocalizationService, private _toastrService: ToastrService) { }
    ngOnInit() {
      this.isEn = this._localizationService.getCurrentLanguage().id === 2;
      const ref = this.route.snapshot.paramMap.get('ref');
      this._adminPolicyService.getSuccessDetails(ref).subscribe((data: CommonResponse<SuccessPolicies>) => {
        this.policy = data.data;
        this.policy.policyStatus.name = this.isEn ? this.policy.policyStatus.nameEn : this.policy.policyStatus.nameAr;
        this.policy.productType.desc = this.isEn ?
         this.policy.productType.descEN :
          this.policy.productType.descAR;
      }, (error) => error);
    }
}
