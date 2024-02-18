import {
  ApproveMoiService,
  CommonResponse,
  LocalizationService,
} from "src/app/core";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";

import { AddCategoryModel } from "./Models/AddCategoryModel";
import { DeleteCategoryItemModel } from "./Models/DeleteCategoryItemModel";
import { DomSanitizer } from "@angular/platform-browser";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { WareefCategoryModel } from "./Models/WareefCategory";
import { WareefService } from "../core/services/wareef.service";

@Component({
  selector: "app-wareef-category",
  templateUrl: "./wareef-category.component.html",
  styleUrls: ["./wareef-category.component.css"],
})
export class WareefCategoryComponent implements OnInit {
  data: any;

  selectedDeleteId = null;
  deletedItem: DeleteCategoryItemModel;

  AllData: WareefCategoryModel[];
  dataCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  isSearch = false;
  status = [
    { code: "1", name: "Approved " },
    { code: "0", name: "Pending" },
  ];
  showEmptySearchValidation = false;
  emptyValidationTextToAdd: string;
  selectedImage;
  AddDailog;
  ImageFront!: any;
  ImageFrontCompressed: string | null = null;
  // WareefAdd: AddWareefModel;
  selectedImage1;
  fileToUpload;
  showenImage;
  EditDailog:boolean;
  CategoryAdd: AddCategoryModel;
  SelectedCategory: AddCategoryModel;
  deleteDialog: boolean = false;
  attatch!: string;
  attatchName!: string;

  constructor(
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    // private imageCompress: NgxImageCompressService,
    private _wareefService: WareefService,
    private _translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private CDR: ChangeDetectorRef
  ) {
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;
    // this.filterModel.lang = this.isEnglish ? 'en' : 'ar';
    // this.filterModel.startDate = this.today;
    // this.filterModel.endDate = this.today;

    // this.actionModel.lang = this.isEnglish ? 'en' : 'ar';
  }

  ngOnInit() {
    this.selectedDeleteId = null;
    this.deletedItem = null;
    this.deleteDialog = false;
    this.CategoryAdd = {
      nameAr: null,
      nameEn: null,
      icon: null,
    };
    this.SelectedCategory = {
      nameAr: null,
      nameEn: null,
      icon: null,
    };
    this.initializeData();
  }

  //   onFileChanged(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.attatchName = event.target.files[0].name;
  //     this.convertFile(event.target.files[0]).subscribe((base64) => {
  //       this.attatch = base64;
  //     });
  //   } else {
  //     this.attatch = '';
  //   }
  // }

  // convertFile(file: File): Observable<string> {
  //   const result = new ReplaySubject<string>(1);
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(file);
  //   reader.onload = (event) => {
  //     if (event.target.) {

  //       console.log(event.target);
  //       // result.next(btoa(event.target.result.toString()));
  //     }
  //   };
  //   return result;
  // }
  onFileChanged(files: FileList) {
    this.fileToUpload = files.item(0);
    this.blobToBase64(this.fileToUpload).then((res) => {
      // this.AddForm.value.imageData.imageData = res as string;
    });
  }
  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  filterClick(e) {
    if (this.ValidateUserEntry()) {
      this.showEmptySearchValidation = false;
      this.emptyValidationTextToAdd = "";
      this.isSearch = true;
      // if (this.filterModel.startDate) {
      //   this.filterModel.startDate.setHours(
      //     this.filterModel.startDate.getHours() - this.filterModel.startDate.getTimezoneOffset() / 60);
      // }
      // if (this.filterModel.endDate) {
      //   this.filterModel.endDate.setHours(
      //     this.filterModel.endDate.getHours() - this.filterModel.endDate.getTimezoneOffset() / 60);
      // }

      e.reset();
    } else {
      this.showEmptySearchValidation = true;
      this.emptyValidationTextToAdd = this.isEnglish
        ? "Please enter NationalId or Email to search"
        : "من فضلك ادخل الهوية او البريد الإلكترونى للبحث";
    }
  }

  ValidateUserEntry() {
    if (
      true
      // (typeof this.filterModel.nin != 'undefined' && this.filterModel.nin) ||
      //   (typeof this.filterModel.email != 'undefined' && this.filterModel.email) ||
      //   (typeof this.filterModel.status != 'undefined' && this.filterModel.status))
    ) {
      return true;
    } else {
      return false;
    }
  }

  initializeData() {
    this.loading = true;
    this._wareefService.getAllCategory().subscribe(
      (data: CommonResponse<WareefCategoryModel[]>) => {
        this.data = data.data;
        this.AllData = this.data.CategoryData;
        console.log(this.data.CategoryData);
        this.dataCount = data.totalCount;
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
      },
      (error: any) => {
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
  Edit(id) {
    this.EditDailog = true;
    this.AllData.forEach((item) => {
      if (item.Id == id) {
        this.SelectedCategory.icon = item.Icon;
        this.SelectedCategory.nameAr = item.NameAr;
        this.SelectedCategory.nameEn = item.NameEn;
        this.SelectedCategory.id = item.Id
      }
    });
  }

  SubmitEdit() {
    this._wareefService.EditCategory(this.SelectedCategory).subscribe(
      (data: any) => {
        console.log(data);
        this._toastrService.success(data.data.ErrorDescription);
        this.initializeData();
        this.EditDailog = false;
      },
      (error: any) => {
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
    //this.loading = true;
    // this.actionModel.id = id;
    // this.actionModel.isActive = true;
    // this.actionModel.type = enrolledType;
    // this._promotionService.approvePromotionApproval(this.actionModel).subscribe((data: CommonResponse<any>) => {
    //     if (data.data.Result === true) {
    //       this._translate.get('updateRequest.approved').subscribe(res => {
    //         this._toastrService.success(res);
    //       });
    //       this.initializeData(this.filterModel, 1, 10);
    //     } else {
    //       this._translate.get('updateRequest.rejected').subscribe(res => {
    //         this._toastrService.error(res);
    //       });
    //     }
    //     this.loading = false;
    //   }, (error: any) => {
    //     if (error.errors) {
    //       this.loading = false;
    //       error.errors.forEach(item => {
    //         this._toastrService.error(item.code, item.description);
    //       });
    //     }
    //   }
    // );
  }

  showDeleteDialog(id) {
    this.deleteDialog = true;
    this.selectedDeleteId = id;
  }
  delete() {
    this.loading = true;
    this.AllData.forEach((data) => {
      console.log(data);
      if (data.Id == this.selectedDeleteId) {
        this.selectedDeleteId = data.Id;
        console.log("Selected >>>>>" + this.selectedDeleteId);
        console.log("Data >>>>>>" + data.Id);

        this.deletedItem = { categoryId: data.Id };
        console.log(this.deletedItem);
      }
    });
    this._wareefService.DeleteCategory(this.deletedItem).subscribe(
      (data: CommonResponse<any>) => {
        console.log(data.data);
        if (data.data.ErrorCode === 1) {
          this.deleteDialog = false;
          this.loading = false;
          this.initializeData();
          this._translate.get("common.deleteDone").subscribe((res) => {
            this._toastrService.success(res);
          });
          this.selectedDeleteId = null;
          this.deletedItem = null;
          this.initializeData();
        } else {
          this._translate.get("common.deleteFailed").subscribe((res) => {
            this._toastrService.error(res);
            this.loading = false;
            this.deleteDialog = false;
            this.selectedDeleteId = null;
            this.deletedItem = null;
          });
        }
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
  ShowAddItem() {
    this.AddDailog = true;
    this.CategoryAdd.icon = "";
    this.CategoryAdd.nameAr = "";
    this.CategoryAdd.nameEn = "";
  }
  submit(form) {
    if (form.valid) {
      if(this.SelectedCategory.id == null ){
        this.SubmitAddItem(this.SelectedCategory);
      }
      else{
        this.Edit(this.SelectedCategory);
      }
  
    }
  }
  SubmitAddItem(SelectedCategory) {
    console.log(this.CategoryAdd);
    this._wareefService.addWareefCategory(this.CategoryAdd).subscribe(
      (data: any) => {
        console.log(data);
        // this.dataCount = data.totalCount;
        // this.loading = false;
        // this.firstTime = false;
        // this.isSearch = false;
        this.initializeData();
        this.AddDailog;
      },
      (error: any) => {
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
    this.AddDailog = false;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.blobToBase64(this.fileToUpload).then((res) => {
      this.CategoryAdd.icon = res as string;
    });
  }
  // blobToBase64(blob) {
  //   return new Promise((resolve, _) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  // }
}
