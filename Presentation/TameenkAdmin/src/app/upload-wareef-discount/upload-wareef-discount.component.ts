import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { FileModel } from '../core/models/file-model';
import { CommonResponse, LocalizationService, PromotionService } from '../core';
import { PromotionDiscountSheetModel } from '../promotion-program/upload-promotion-discount-sheet/promotion-discount-sheet-model';
import { OutputModel } from '../core/models/output-model';
import { GeneratePolicyRes } from '../policies/generate/generate-policy';
import { WareefService } from '../core/services/wareef.service';
@Component({
  selector: 'app-upload-wareef-discount',
  templateUrl: './upload-wareef-discount.component.html',
  styleUrls: ['./upload-wareef-discount.component.css']
})

  export class UploadWareefDiscountComponent implements OnInit {
    discountFilter: PromotionDiscountSheetModel;
    date:Date;
    discountListing: PromotionDiscountSheetModel[];
    discountListingCount;
    emptyStringValue = 'ــــــــــــــــــ';
    eventHolder;
    loading: boolean;
    firstTime: boolean;
    isEnglish: boolean;
    openPpUp = false;
    clicked = false;
    uploading = false;
    showEmptySearchValidation = false;
    emptyValidationTextToAdd: string;
    showUploadPromotionDiscountFileValidation = false;
    ploadPromotionDiscountFileValidationTextToAdd: string;
    file: File;
    formData = new FormData();
    //promotionDiscountSheetFile: any;
    fileModel: FileModel = new FileModel();
  
    constructor(
      private _promotionService: PromotionService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService,
      private _wareefService: WareefService,
      private _translate: TranslateService) { }
  
    ngOnInit() {
      this.discountFilter = new PromotionDiscountSheetModel();
      this.loading = false;
      this.firstTime = true;
      this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    }
  
    // filterClick(e) {
    //   if (this.ValidateUserEntry()) {
    //     this.showEmptySearchValidation = false;
    //     this.emptyValidationTextToAdd = '';
    //     e.reset();
    //   } else {
    //     this.showEmptySearchValidation = true;
    //     this.emptyValidationTextToAdd = (this.isEnglish) ? 'Please Enter at least one field to search'
    //                                                     : 'من فضلك ادخل حقل واحد على الأقل للبحث';
    //   }
    // }
  
    // ValidateUserEntry() {
    //   if ((typeof this.discountFilter.nin != 'undefined' && this.discountFilter.nin) ||
    //       (typeof this.discountFilter.mobile != 'undefined' && this.discountFilter.mobile)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  
    showUploadingWindow() {
      this.clicked = false;
      this.uploading = false;
      this.showUploadPromotionDiscountFileValidation = false;
      this.openPpUp = true;
    }
  
    closeUploadingWindow() {
      this.openPpUp = false;
    }
  
    handleReUploadFileInput(e, files) {
      if (this.date) {
        this.date.setHours(
          this.date.getHours() - this.date.getTimezoneOffset() / 60);
        }
      
      if (files && files.length > 0 && files[0] != null) {
        const ext = files[0].name.split('.').pop();
        if (ext === 'xlsx' || ext === 'xls') {
          this.clicked = false;
          this.showUploadPromotionDiscountFileValidation = false;
          const fileReader = new FileReader();
          fileReader.readAsBinaryString(files[0]);
          fileReader.onload = () => {
           if (fileReader.DONE) {
              // this.promotionDiscountSheetFile = btoa(fileReader.result.toString());
                this.fileModel.content = btoa(fileReader.result.toString());
                this.fileModel.name = files[0].name;
                this.fileModel.extension = ext;
                this.fileModel.size = files[0].size;
                this.fileModel.date = this.date;
            }
          };
        } else {
          this.clicked = true;
          this.showUploadPromotionDiscountFileValidation = true;
          this.ploadPromotionDiscountFileValidationTextToAdd = (this.isEnglish) ? 'Please Upload excel file only'
                                                                   : 'فقط excel من فضلك حمل ملف';
        }
      } else {
        // this.promotionDiscountSheetFile = null;
          this.showUploadPromotionDiscountFileValidation = true;
          this.ploadPromotionDiscountFileValidationTextToAdd = (this.isEnglish) ? 'File not uploaded'
                                                                   : 'لم يتم رفع الملف';
          this.fileModel = new FileModel();
      }
      this.clicked = false;
      this.uploading = false;
    }
  
    uploadPromotionDiscountsSheet() {
      if (!this.fileModel || !this.fileModel.content) {
        this.showUploadPromotionDiscountFileValidation = true;
        this.ploadPromotionDiscountFileValidationTextToAdd = (this.isEnglish) ? 'Please Upload File First'
                                                                 : 'من فضلك حمل الملف أولا';
      } else {
        
          this.clicked = true;
          this.uploading = true;

          this._wareefService.uploadDataFile(this.fileModel).subscribe((data: CommonResponse<OutputModel>) => {
            console.log('data.data after uploading excel file');
            console.log(data.data);
            if (data.data.errorCode === 1) {
              // this.showReUploadForm = false;
              this.openPpUp = false;
              if (data.data.errorDescription === 'success') {
                this._toastrService.success((this.isEnglish) ? 'Data imported succefully'
                                                      : 'تم تحميل ملف الخصومات بنجاح');
              } else {
                alert(data.data.errorDescription);
              }
            } else {
              this._toastrService.error(data.data.errorDescription);
            }
  
            this.clicked = false;
            this.uploading = false;
            this.showUploadPromotionDiscountFileValidation = false;
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


