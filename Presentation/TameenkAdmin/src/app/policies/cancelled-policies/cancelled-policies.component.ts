import { Component, OnInit } from '@angular/core';
import { CommonResponse, LocalizationService, InsuranceCompanyService, AdminPolicyService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import { SuccessPolicies } from '../success-policies/success-policies';
import { SuccessFilter } from '../success-policies/success-filter';
import {InputSwitchModule} from 'primeng/inputswitch';
@Component({
  selector: 'app-cancelled-policies',
  templateUrl: './cancelled-policies.component.html',
  styleUrls: ['./cancelled-policies.component.css']
})
export class CancelledPoliciesComponent implements OnInit {

  referencyId:string;
  isCancel : boolean;
  loading:boolean;
isEnglish:boolean;
  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }
  
    ngOnInit() {
      
      this.loading = true;
      this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
      this.isCancel=  true;
    }
  
    handleChange() {
     // let isChecked = e.checked;
     this._adminPolicyService.cancelPolicy(this.referencyId, true).subscribe(
        (result) => {
          if(result.data == true)
          {
            
              this._toastrService.success("تم تعطيل الوثيقه");
          }
            
          else if (result.data == false){
            this._toastrService.error("حدث خطا برجاء المحاوله مره اخرى");
          }
  
       }
       ,
        (error) => {
        this._toastrService.error(error);
       });
  }

}
