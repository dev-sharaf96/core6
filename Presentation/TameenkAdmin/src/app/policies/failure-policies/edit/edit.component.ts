import { Component, OnInit } from '@angular/core';
import { CommonResponse, LocalizationService, AdminPolicyService, PolicyStatusEnum, PolicyStatus } from 'src/app/core';
import { FailurePolicies } from '../failure-policies';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
policy: FailurePolicies = new FailurePolicies();
isEn: boolean;
policyStatusEnum = PolicyStatusEnum;
isDetails: boolean;
status;
  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _router: Router,
    private route: ActivatedRoute,
    private _localizationService: LocalizationService, private _toastrService: ToastrService) { }
  ngOnInit() {
    this.isEn = this._localizationService.getCurrentLanguage().id === 2;
    const ref = this.route.snapshot.paramMap.get('ref');
    this._adminPolicyService.getFailDetails(ref).subscribe((data: CommonResponse<FailurePolicies>) => {
      this.policy = data.data;
      this.policy.insuredFullName = this.isEn ? this.policy.insuredFullNameEn : this.policy.insuredFullNameAr;
      this.policy.insuranceCompany = this.isEn ? this.policy.insuranceCompanyEn : this.policy.insuranceCompanyAr;
      this.policy.policyStatus.name = this.isEn ? this.policy.policyStatus.nameEn : this.policy.policyStatus.nameAr;
      this.policy.productType.desc = this.isEn ?
       this.policy.productType.descEN :
        this.policy.productType.descAR;

        this.isDetails =
        this.policy.policyStatus.id !== this.policyStatusEnum.Available &&
        this.policy.policyStatus.id !== this.policyStatusEnum.PolicyFileDownloadFailure &&
        this.policy.policyStatus.id !== this.policyStatusEnum.PolicyFileGeneraionFailure;
    }, (error) => error);

    this._adminPolicyService.getPolicyStatus().subscribe((data: CommonResponse<PolicyStatus[]>) => {
      this.status = data.data;
      this.status.forEach((stat) => {
        stat.name = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? stat.nameEn
        : stat.nameAr;
      });
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  onSubmit(form) {
    this._adminPolicyService.editFailurePolicy(this.policy).subscribe(data => {
      this._router.navigate(['/admin/policies/failure']);
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
        });
      }
    });
  }
}
