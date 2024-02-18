import { Component, OnInit } from '@angular/core';
import { PolicyService, IUserPolicy, LocalizationService, CommonResponse, AuthService } from 'src/app/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  products: IUserPolicy[];
  totalCount: number;
  loading = false;
  constructor(
    private _policyService: PolicyService,
    private _localizationService: LocalizationService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getUserPolicies();
  }
  getUserPolicies(paging?) {
    this.loading = true;
    this._policyService.getUserPolicies(this._authService.getUserId(), paging).subscribe((data: CommonResponse<IUserPolicy[]>) => {
    this.loading = false;
      this.products = data.data;
      this.totalCount = data.totalCount;
      this.products.forEach(p => {
        p.najmStatusObj.name = this._localizationService.getCurrentLanguage().id === 2
        ? p.najmStatusObj.nameEn
        : p.najmStatusObj.nameAr;
        p.policyStatus.name = this._localizationService.getCurrentLanguage().id === 2
        ? p.policyStatus.nameEn
        : p.policyStatus.nameAr;
        p.companyName = this._localizationService.getCurrentLanguage().id === 2
        ? p.companyNameEn
        : p.companyNameAr;
      });
    },
    (error: any) => error);
  }
  downloadPolicy(fileId) {
    this._policyService.downloadUserPolicy(fileId).subscribe((data: CommonResponse<string>) => {
      const a = document.createElement('a');
        a.href = 'data:application/pdf;base64,' + data.data;
        a.download = 'policy';
        document.body.appendChild(a);
        a.click();
    },
    (error: any) => error);
  }
}
