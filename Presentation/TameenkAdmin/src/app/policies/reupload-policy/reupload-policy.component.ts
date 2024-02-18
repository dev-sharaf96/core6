import { Component, OnInit } from '@angular/core';
import { SuccessPolicies } from '../success-policies/success-policies';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminPolicyService, LocalizationService, CommonResponse } from 'src/app/core';
import { SuccessFilter } from '../success-policies/success-filter';
import { GeneratePolicyRes } from '../generate/generate-policy';
import { StatusPolicies } from '../status/policies-status';

@Component({
  selector: 'app-reupload-policy',
  templateUrl: './reupload-policy.component.html',
  styleUrls: ['./reupload-policy.component.css']
})
export class ReuploadPolicyComponent implements OnInit {
  policiesFilter: SuccessFilter;
  policy: StatusPolicies = new StatusPolicies();
  isEn: boolean;
  showReUploadForm = false;
  showSearchValidation = false;
  searchValidationTextToAdd: string;
  showReUploadPolicyFileValidation = false;
  reUploadPolicyFileValidationTextToAdd: string;
  clicked = false;

  constructor(
    private _adminPolicyService: AdminPolicyService,
      private _router: Router,
      private route: ActivatedRoute,
      private _localizationService: LocalizationService, private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.policiesFilter = this._adminPolicyService.successFilter;
    this.isEn = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  filterClick() {
    if (this.policiesFilter.referenceNo) {
      this.showSearchValidation = false;
      if (this.policiesFilter.referenceNo) {
        this._adminPolicyService.getSuccessDetailsForEdit(this.policiesFilter.referenceNo).subscribe((data: CommonResponse<StatusPolicies>) => {
          console.log("filterClick-referenceNo --> data");
          console.log(data);
          if (data.data != null) {
            this.policy = data.data;
            this.showReUploadForm = true;
          } else {
            this.showSearchValidation = true;
            this.searchValidationTextToAdd = (this.isEn) ? 'An error happend while retreving data'
                                                               : 'حدث خطأ أثناء استدعاء بيانات الوثيقة';
          }
        }, (error) => error);
      }
      // if (this.policiesFilter.policyNo) {
      //   this._adminPolicyService.getPolicyDetailsBypolicyNo(this.policiesFilter.policyNo)
      //       .subscribe((data: CommonResponse<SuccessPolicies>) => {
      //     console.log("filterClick-policyNo --> data");
      //     console.log(data);
      //     if (data.data != null) {
      //       this.policy = data.data;
      //       this.showReUploadForm = true;
      //     } else {
      //       this.showSearchValidation = true;
      //       this.searchValidationTextToAdd = (this.isEn) ? 'An error happend while retreving data'
      //                                                          : 'حدث خطأ أثناء استدعاء بيانات الوثيقة';
      //     }
      //   }, (error) => error);
      // 
    } else {
      this.showReUploadForm = false;
      this.showSearchValidation = true;
      this.searchValidationTextToAdd = (this.isEn) ? 'Please Enter Search data first'
                                                               : 'يرجى إدخال بيانات البحث أولاً';
    }
  }

  handleReUploadFileInput(e, files) {
    if (files[0] != null) {
      const ext = files[0].name.split('.').pop();
      if (ext === 'pdf') {
        this.clicked = false;
        this.showReUploadPolicyFileValidation = false;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
         if (fileReader.DONE) {
            this.policy.poloicyFileToUpload = btoa(fileReader.result.toString());
          }
        };
      } else {
        this.clicked = true;
        this.showReUploadPolicyFileValidation = true;
        this.reUploadPolicyFileValidationTextToAdd = (this.isEn) ? 'Please Upload pdf file only'
                                                                 : 'فقط pdf من فضلك حمل ملف بصيغة';
      }
    } else {
      this.policy.poloicyFileToUpload = null;
    }
  }

  OnSubmit() {
    if (this.policy.poloicyFileToUpload == null) {
      this.showReUploadPolicyFileValidation = true;
      this.reUploadPolicyFileValidationTextToAdd = (this.isEn) ? 'Please Upload Policy File First'
                                                               : 'من فضلك حمل ملف الوثيقة أولا';
    } else {
        this.clicked = true;
        this._adminPolicyService.reUploadPolicyTemplate(this.policy).subscribe((data: CommonResponse<GeneratePolicyRes>) => {
          console.log('OnSubmit --> data');
          console.log(data);
          if (data.data.ErrorCode === 1) {
            // this.showReUploadForm = false;
            this._toastrService.success((this.isEn) ? 'Policy is re-uploaded successfully'
                                                    : 'تم إعادة تحميل الوثيقة بنجاح');
          } else {
            this._toastrService.error(data.data.ErrorDescription);
          }

          this.clicked = false;
        }, (error: any) => {
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
