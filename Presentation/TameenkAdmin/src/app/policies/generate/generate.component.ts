import { Component, OnInit } from '@angular/core';
import { GeneratePolicy } from './generate-policy';
import { PolicyService, InsuranceCompanyService, CommonResponse, IIdNamePairModel, AdminPolicyService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  policy: GeneratePolicy = new GeneratePolicy();
  companies;
  company = new IIdNamePairModel();
  loading = false;
  isRequired = true;
  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _router: Router) { }

  ngOnInit() {
    this.loading = false;
    this.policy.channel = 'Dashboard';
    this.policy.policyFileUrl = '';
    this._insuranceCompanyService.getInsuranceCompaniesName().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.companies = [];
      this.companies = data.data;
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  companyChanged() {
    this.policy.companyID = this.company.id;
  }

  handleFileInput(e) {
    const type = e.files[0].type;
    const fileReader = new FileReader();
    if (type.includes('pdf')) {
      fileReader.readAsBinaryString(e.files[0]);
      fileReader.onload = () => {
        if (fileReader.DONE) {
          this.policy.policyFile = btoa(fileReader.result.toString());
        }
      };
    }
  }
  generate(form) {
    if (form.valid) {
      this.loading = true;
      // Set Timezone
      this.policy.policyEffectiveDate.setHours(
        this.policy.policyEffectiveDate.getHours() - this.policy.policyEffectiveDate.getTimezoneOffset() / 60);
      this.policy.policyIssuanceDate.setHours(
        this.policy.policyIssuanceDate.getHours() - this.policy.policyIssuanceDate.getTimezoneOffset() / 60);
      this.policy.policyExpiryDate.setHours(
        this.policy.policyExpiryDate.getHours() - this.policy.policyExpiryDate.getTimezoneOffset() / 60);

      this._adminPolicyService.generatePolicyManually(this.policy).subscribe(data => {
        this.loading = false;
        if (data.data.ErrorCode === 1) {
          this._router.navigate(['/admin/policies/generate']);
          this._toastrService.success(data.data.ErrorDescription);
        } else {
            this._toastrService.error(data.data.ErrorDescription);
        }
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
  }

  IsPolicyGeneratedByBCare(event) {
    this.isRequired = (event.target.checked) ? false : true;
  }
}
