import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminPolicyService, LocalizationService, CommonResponse, PolicyStatus } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy-status-dropdown',
  templateUrl: './policy-status.dropdown.component.html',
  styleUrls: ['./policy-status.dropdown.component.css']
})
export class PolicyStatusDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  status: PolicyStatus[];
  stat = new PolicyStatus();
  constructor(private _adminPolicyService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this._adminPolicyService.getPolicyStatus().subscribe((data: CommonResponse<PolicyStatus[]>) => {
      this.status = [];
      this.status = data.data;
      this.status.forEach((stat) => {
        stat.name = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? stat.nameEn
        : stat.nameAr;
      });
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.status.unshift({id: null, name: 'all'})
      : this.status.unshift({id: null, name: 'الكل'});
      this.stat = this.status.find((c) => c.id === this.selectedValue);
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  changed() {
    this.selectedValue = this.stat.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
