import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CommonResponse, LocalizationService, PromotionService } from 'src/app/core';
import { ApprovalActionModel } from './approval-action-model';
import { ApprovalFilterModel } from './approval-filter-model';
import { ApprovalListingModel } from './approval-listing-model';

@Component({
  selector: 'app-promotion-program-approvals',
  templateUrl: './promotion-program-approvals.component.html',
  styleUrls: ['./promotion-program-approvals.component.css']
})
export class PromotionProgramApprovalsComponent implements OnInit {
  actionModel: ApprovalActionModel = new ApprovalActionModel();
  filterModel: ApprovalFilterModel = new ApprovalFilterModel();
  data: ApprovalListingModel[];
  dataCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  isSearch = false;
  status = [
    { code: '1', name: 'Approved ' },
    { code: '0', name: 'Pending' }
  ];
  showEmptySearchValidation = false;
  emptyValidationTextToAdd: string;
  selectedImage;

  constructor(private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _promotionService: PromotionService,
    private _translate: TranslateService, private domSanitizer: DomSanitizer) {
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.filterModel.lang = this.isEnglish ? 'en' : 'ar';
    this.filterModel.startDate = this.today;
    this.filterModel.endDate = this.today;

    this.actionModel.lang = this.isEnglish ? 'en' : 'ar';
  }

  ngOnInit() {
  }

  filterClick(e) {
    if (this.ValidateUserEntry()) {
      this.showEmptySearchValidation = false;
      this.emptyValidationTextToAdd = '';
      this.isSearch = true;
      if (this.filterModel.startDate) {
        this.filterModel.startDate.setHours(
          this.filterModel.startDate.getHours() - this.filterModel.startDate.getTimezoneOffset() / 60);
      }
      if (this.filterModel.endDate) {
        this.filterModel.endDate.setHours(
          this.filterModel.endDate.getHours() - this.filterModel.endDate.getTimezoneOffset() / 60);
      }

      e.reset();
    } else {
      this.showEmptySearchValidation = true;
      this.emptyValidationTextToAdd = (this.isEnglish) ? 'Please enter NationalId or Email to search'
                                                      : 'من فضلك ادخل الهوية او البريد الإلكترونى للبحث';
    }
  }

  ValidateUserEntry() {
    if ((typeof this.filterModel.nin != 'undefined' && this.filterModel.nin) ||
        (typeof this.filterModel.email != 'undefined' && this.filterModel.email) ||
        (typeof this.filterModel.status != 'undefined' && this.filterModel.status)) {
      return true;
    } else {
      return false;
    }
  }

  initializeDataLazyLoad(event) {
    this.eventHolder = event;
    // this.loading = true;
    this.isSearch = true;

    let status: any;
    if (this.filterModel.status !== null)
      status = this.filterModel.status;

    this.filterModel.status = status ? +status.code : null;
    let pageIndex = (event.first / event.rows) + 1;
    let pageSize = event.rows;
    this.initializeData(this.filterModel, pageIndex, pageSize);
  }

  initializeData(filterModel, pageIndex, pageSize) {
    this.loading = true;
    this._promotionService.getAllApprovalsWithFilter(filterModel, `pageIndex=${pageIndex}&pageSize=${pageSize}`).subscribe((data: CommonResponse<any>) => {
        this.data = data.data.Result;
        this.data.forEach(item => {
          if(item.enrolledType === 'ByAttachmentAndNin') {
            item.approved = item.ninVerified ? true : false;
            item.type = this.isEnglish ? 'By Attachment' : 'تعريف بالعمل';
          } else if(item.enrolledType === 'ByEmailAndNin') {
            item.approved = item.emailVerified ? true : false;
            item.type = this.isEnglish ? 'By Email' : 'بريد العمل';
          } else if(item.enrolledType === 'ByEmail') {
            item.nin = null;
            item.approved = item.emailVerified ? true : false;
            item.type = this.isEnglish ? 'From Profile' : 'من الملف الشخصى';
          }
        });

        this.dataCount = data.totalCount;
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
      }, (error: any) => {
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  showImg(id: number) {
    this.loading = true;
    this._promotionService.getImage(`id=${id}&lang=${this.actionModel.lang}`).subscribe((data: CommonResponse<any>) => {
        this.loading = false;
        var imageBase64String = data.data.Result;
        if(imageBase64String != ''){
          this.selectedImage = 'data:image/jpg;base64,' + imageBase64String;
        }
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
      );
  }

  approve(id, enrolledType) {
    this.loading = true;

    this.actionModel.id = id;
    this.actionModel.isActive = true;
    this.actionModel.type = enrolledType;
    this._promotionService.approvePromotionApproval(this.actionModel).subscribe((data: CommonResponse<any>) => {
        if (data.data.Result === true) {
          this._translate.get('updateRequest.approved').subscribe(res => {
            this._toastrService.success(res);
          });

          this.initializeData(this.filterModel, 1, 10);
        } else {
          this._translate.get('updateRequest.rejected').subscribe(res => {
            this._toastrService.error(res);
          });
        }

        this.loading = false;
      }, (error: any) => {
        if (error.errors) {
          this.loading = false;
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  delete(id) {
    this.loading = true;

    this.actionModel.id = id;
    this._promotionService.deletePromotionApproval(this.actionModel)
    .subscribe((data: CommonResponse<any>) => {
        if (data.data.Result === true) {
          this._translate.get('common.deleteDone').subscribe(res => {
            this._toastrService.success(res);
          });

          this.initializeData(this.filterModel, 1, 10);
        } else {
          this._translate.get('common.deleteFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }

        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

}
