import { DocType } from './doc-type.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserPolicy, PolicyService, LocalizationService, CommonResponse } from 'src/app/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IEditRequest } from './edit-request.model';
import { IPolicyUpdateFileDetail } from './policy-update-file-detail.model';
import { EditType } from './edit-type.enum';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  id: number;
  policy: IUserPolicy;
  private sub: any;
  filesInputs = [];
  editModel: IEditRequest;
  errors: string[];
  optionsListAr = [
    {
      name: 'تعديل خطأ بالوثيقه',
      value: 'fixPolicyError'
    },
    {
      name: 'تغيير اللوحة',
      value: 'changeLicense'
    },
    {
      name: 'إصدار لوحة',
      value: 'createLicense'
    },
    {
      name: 'إضافة سائق',
      value: 'addDriver'
    }
  ];
  optionsListEn = [
    {
      name: 'Mistake in document',
      value: 'fixPolicyError'
    },
    {
      name: 'Change plate',
      value: 'changeLicense'
    },
    {
      name: 'Release plate',
      value: 'createLicense'
    },
    {
      name: 'Add driver',
      value: 'addDriver'
    }
  ];
  optionsList = this.optionsList = this._localizationService.getCurrentLanguage().id === 2
  ? this.optionsListEn
  : this.optionsListAr;
  selectedOption = 0;
  docType = DocType;
  editType = EditType;
  constructor(
    private route: ActivatedRoute,
    private _policyService: PolicyService,
    private _router: Router,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
      if (this.id) {
        // this.id = +params['id'];
        this.editModel = {
          policyId: this.id,
          policyUpdateFileDetails: [],
          editRequestType: 0,
        };
        if (this._policyService.userPolicies && this.id) {
          this._policyService.userPolicies
            .pipe(map(data => data.data.find(p => p.id === this.id)))
            .subscribe(data => {
              this.policy = data;
              this.policy.najmStatusObj.name = this._localizationService.getCurrentLanguage().id === 2
              ? this.policy.najmStatusObj.nameEn
              : this.policy.najmStatusObj.nameAr;
              this.policy.policyStatus.name = this._localizationService.getCurrentLanguage().id === 2
              ? this.policy.policyStatus.nameEn
              : this.policy.policyStatus.nameAr;
              this.policy.companyName =
                this._localizationService.getCurrentLanguage().id === 2
                  ? this.policy.companyNameEn
                  : this.policy.companyNameAr;
            });
        } else {
          this._router.navigate(['profile', 'products']);
        }
      } else {
        this._router.navigate(['profile', 'products']);
      }
  }
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
  onChangeOption(e) {
    this.filesInputs = [];
    this.selectedOption = e.value;
    this.editModel.editRequestType = parseInt(this.editType[e.value], 0);
  }
  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (!this.filesInputs.includes(event.target)) {
        this.filesInputs.push(event.target);
      } else {
        this.filesInputs.splice(this.filesInputs.indexOf(event.target), 1);
        this.filesInputs.push(event.target);
      }
      const imgHolder = event.target.parentNode.querySelector('.img-preview');
      const type = event.target.files[0].type;
      if (type.includes('image')) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          imgHolder.innerHTML = '<img src="' + reader.result + '" style="border: solid 1px #22d022;" />';
        };
        reader.readAsDataURL(file);
      } else if (type.includes('pdf')) {
        imgHolder.innerHTML = '<img src="assets/imgs/PDF_file_icon.svg" style="height: 80px;" />';
      } else {
        imgHolder.innerHTML = '';
        event.target.value = null;
        this.filesInputs.splice(this.filesInputs.indexOf(event.target), 1);
      }
    }
  }
  submitEditRequest(e) {
    this.errors = [];
    let i = 0;
    this.editModel.editRequestType = parseInt(this.editType[this.selectedOption], 0);
    if (this.filesInputs != null) {
      this.filesInputs.forEach(input => {
        const fileDetail: IPolicyUpdateFileDetail = {
          docType: parseInt(this.docType[input.name], 0),
          fileByteArray: '',
          fileMimeType: input.files[0].type,
          fileName: input.files[0].name.split('.').slice(0, -1).join('.')
        };
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(input.files[0]);
        fileReader.onload = () => {
          fileDetail.fileByteArray = btoa(fileReader.result.toString());
          this.editModel.policyUpdateFileDetails.push(fileDetail);
          i++;
          if (i === this.filesInputs.length) {
            this._policyService.UpdateRequestPolicy(this.editModel).subscribe((res: CommonResponse<string>) => {
              this.editModel.policyUpdateFileDetails = [];
              this._router.navigate(['profile/products']);
            },
            (error) => {
              if (error.errors) {
                error.errors.forEach(err => {
                  this.errors.push(err.description);
                });
              } else {
                this.errors.push(error.Message);
              }
              this.editModel.policyUpdateFileDetails = [];
            });
          }
        };
      });
    }
  }
}
