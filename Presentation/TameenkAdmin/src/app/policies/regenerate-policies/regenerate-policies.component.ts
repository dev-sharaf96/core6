import { Component, OnInit } from '@angular/core';

import { AdminPolicyService } from 'src/app/core/services/admin-policy.service';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-regenerate-policies',
  templateUrl: './regenerate-policies.component.html',
  styleUrls: ['./regenerate-policies.component.css']
})
export class RegeneratePoliciesComponent implements OnInit {
  referenceId: string;
  firstTime: boolean;
  emptyStringValue = 'ــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit: boolean;
  today = new Date();
  messageText:string;

  constructor(
    private _adminPolicyServicee: AdminPolicyService,
    private _toastrService: ToastrService,
    private _translate: TranslateService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.referenceId = '';
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode == 'en'
        ? true
        : false;

  }

  regeneratePolicy() {
    this._translate.get('common.confirm').subscribe(res => {
      this.messageText = res;
    });

    if(confirm(this.messageText)){
    this._adminPolicyServicee.regeneratePolicy(this.referenceId)
      .subscribe((data: CommonResponse<boolean>) => {
  
        if (data.data == true) {
          this._translate.get('policy.regeneratedSuccessfully').subscribe(res => {
            this._toastrService.success(res);
          });
        }
        else
        {
          this._translate.get('policy.regenerationFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }
      },
        (error: any) => {
          this.firstTime = true;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
      }
  }

}
