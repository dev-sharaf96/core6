import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { IIdNamePairModel, InsuranceCompanyService } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appCompanyName]'
})
export class CompanyNameDirective implements OnInit {
  @Input() companyId;
  constructor(
    private elem: ElementRef,
    private _insuranceCompanyService: InsuranceCompanyService) {
  }
  ngOnInit() {
    this._insuranceCompanyService.companies.subscribe(data => {
      if (data) {
        const company = data.find(c => c.id === this.companyId);
        if (company) {
          this.elem.nativeElement.innerText = company.name;
        } else {
          this.elem.nativeElement.innerText = 'ــــــــــــــــــ';
        }
      }
    });
  }
}
