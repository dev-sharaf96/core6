import { Component, OnInit } from '@angular/core';
import { PromotionDiscountSheetModel } from './promotion-discount-sheet-model';
import { PromotionService, CommonResponse, LocalizationService } from '../../core';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { FileModel } from '../../core/models/file-model';
import { TranslateService } from '@ngx-translate/core';
import { OutputModel } from '../../core/models/output-model';

@Component({
  selector: 'app-upload-promotion-discount-sheet',
  templateUrl: './upload-promotion-discount-sheet.component.html',
  styleUrls: ['./upload-promotion-discount-sheet.component.css']
})
export class UploadPromotionDiscountSheetComponent implements OnInit {
  discountFilter: PromotionDiscountSheetModel;
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
    private _translate: TranslateService) { }

  ngOnInit() {
    this.discountFilter = new PromotionDiscountSheetModel();
    this.loading = false;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  filterClick(e) {
    if (this.ValidateUserEntry()) {
      this.showEmptySearchValidation = false;
      this.emptyValidationTextToAdd = '';
      e.reset();
    } else {
      this.showEmptySearchValidation = true;
      this.emptyValidationTextToAdd = (this.isEnglish) ? 'Please Enter at least one field to search'
                                                      : 'من فضلك ادخل حقل واحد على الأقل للبحث';
    }
  }

  ValidateUserEntry() {
    if ((typeof this.discountFilter.nin != 'undefined' && this.discountFilter.nin) ||
        (typeof this.discountFilter.mobile != 'undefined' && this.discountFilter.mobile)) {
      return true;
    } else {
      return false;
    }
  }

  PromotionDiscountsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._promotionService.getPromotionDiscountsWithFilter(this.discountFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<PromotionDiscountSheetModel[]>) => {
        this.discountListing = data.data;
        this.discountListingCount = data.totalCount;
        this.loading = false;
        this.firstTime = false;
      }, (error: any) => {
        this.loading = false;
        this.firstTime = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  exportCsv() {
    this._promotionService.exportPromotionDiscountsExcel(this.discountFilter).subscribe((data) => {
      if (data.data) {
        FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
         'Success-Policies.xlsx');
      }
    });
  }

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
    console.log('files');
    console.log(files);
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
        console.log('Upload file');
        console.log(this.fileModel);
        this.clicked = true;
        this.uploading = true;
        this._promotionService.uploadDataFile(this.fileModel).subscribe((data: CommonResponse<OutputModel>) => {
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

  DeleteDiscountRecord(promotionDiscountId) {
    if (confirm('Are you sure ?')) {
      this._promotionService.deletePromotionDiscount(promotionDiscountId)
        .subscribe((data: CommonResponse<GeneratePolicyRes>) => {
          if (data.data.ErrorCode === 1) {
            this._translate.get('common.deleteDone').subscribe(res => {
              this._toastrService.success(res);
            });
          } else {
            this._translate.get('common.deleteFailed').subscribe(res => {
              this._toastrService.error(res);
            });
          }
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
