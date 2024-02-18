import {
  ApproveMoiService,
  CommonResponse,
  IIdNamePairModel,
  LocalizationService,
} from "src/app/core";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { WareefBackModel, WareefEditModel, WareefModel } from "./Models/WareefModel";

import { AddWareefModel } from "./Models/AddWareefModel";
import { DeleteCategoryItemModel } from "../wareef-category/Models/DeleteCategoryItemModel";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { WareefCategoryModel } from "../wareef-category/Models/WareefCategory";
import { WareefService } from "../core/services/wareef.service";
import { e } from "@angular/core/src/render3";

@Component({
  selector: "app-wareef",
  templateUrl: "./wareef.component.html",
  styleUrls: ["./wareef.component.css"],
})
export class WareefComponent implements OnInit {
  // actionModel: ApprovalActionModel = new ApprovalActionModel();
  // filterModel: ApprovalFilterModel = new ApprovalFilterModel();
  data: any;
  AllData: WareefModel[];
  AllBackData:WareefBackModel[];
  EditeWareefId:number;
  deletedItem: DeleteCategoryItemModel;
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
  WareefAdd: AddWareefModel;
  selectedImage1;
  fileToUpload;
  showenImage;
  Category: IIdNamePairModel;
  selectedCategoryValue: number;
  AllCategorydata: any;
  Categories: WareefCategoryModel[];
  ListItem: IIdNamePairModel;
  categoryList: IIdNamePairModel[];
  CategoryItem;
  deleteDialog: boolean = false;
  selectedDeleteId = null;
  selectedDeletItem = null;
  showeditDailog = null;
  attatchName!: string;

  selectedEditedItem =new  WareefEditModel();

  AddForm = this.fb.group({
    nameAr: ["", Validators.required],
    nameEn: ["", Validators.required],
    category: ["", Validators.required],
    imageData: this.fb.group({
      imageData: ["", Validators.required],
      newImageData: [""],
    }),
  });

  constructor(
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    // private imageCompress: NgxImageCompressService,
    private _wareefService: WareefService,
    private _translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private CDR: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;
  }

  ngOnInit() {
    this.showeditDailog = false;
    this.deletedItem = null;
    this.deleteDialog = false;
    this.selectedDeleteId = null;
    this.categoryList = [
      {
        id: null,
        name: null,
      },
    ];
    this.Category = { id: null, name: null };
    this.selectedCategoryValue = 0;
    this.initializeData();
    this.getCategorylist();
  }
  showImg(id: number) {
    this.AllData.forEach((item) => {
      if (item.Id == id) {
        console.log(item.ImageBytes);
        this.showenImage = this.domSanitizer.bypassSecurityTrustResourceUrl(
          item.ImageBytes
        );
        this.selectedImage = true;
      }
    });
  }

  initializeData() {
    this.loading = true;
    this._wareefService.getAll().subscribe(
      (data: CommonResponse<WareefModel[]>) => {
        this.data = data.data;
        this.AllData = this.data.Data;
        this.AllBackData =  this.data.Data;
        console.log(this.data.Data);
        console.log("AllBackData = "+this.AllBackData);
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
          console.log(error.errors);
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
  getCategorylist() {
    this._wareefService.getAllCategory().subscribe(
      (data: CommonResponse<WareefCategoryModel[]>) => {
        this.Categories = [];
        this.categoryList = [];
        this.AllCategorydata = data.data;
        this.Categories = this.AllCategorydata.CategoryData;
        this.Categories.forEach((item) => {
          let model = new IIdNamePairModel();
          model.id = item.Id;
          model.name = this.isEnglish ? item.NameEn : item.NameAr;
          this.categoryList.push(model);
        });
        this.CategoryItem = this.categoryList.find(
          (c) => c.id === this.selectedCategoryValue
        );
      },
      (error: any) => {
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
  changeCategory(event) {
    this.AddForm.value.categoryId = event.value.id;
    console.log(this.AddForm.value);
  }
  ShowEdit(id) {
    this.showeditDailog = true;
    this.EditeWareefId = 0;
    this.AddDailog = false;
    this.AllBackData.forEach((item) => {
      if (item.Id == id) {
        this.selectedEditedItem.NameAr = item.NameAr;
        this.selectedEditedItem.NameEn = item.NameEn;
        this.selectedEditedItem.ImageData.imageData = item.ImageBytes;
        this.selectedEditedItem.Category = this.categoryList.find(x=>x.id == item.WareefCategoryId);
        // this.AddForm.value.nameAr = item.NameAr;
        // this.AddForm.value.nameEn = item.NameEn;
        // this.AddForm.value.imageData.imageData = item.ImageBytes;
        // this.AddForm.value.category =  this.Categories.find(x=>x.Id == item.WareefCategoryId);
        this.selectedEditedItem.Id = item.Id;
      }
    });
    console.log(this.selectedEditedItem);
  }
  Edit() {
    this.loading = true;
    console.log("selectedEditedItem = "+ this.selectedEditedItem)
    this._wareefService.editWareef(this.selectedEditedItem).subscribe(
      (data: any) => {
        console.log(data);
        if (data.data.ErrorCode == 1) {
          this.loading= false;
          this._toastrService.success(data.data.ErrorDescription);
          this.initializeData();
          this.showeditDailog = false;
        } else {
          this.loading= false;
          this._toastrService.error(data.data.ErrorDescription);
        }
      });
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
      if (data.Id == this.selectedDeleteId) {
        this.selectedDeletItem = data;
        this.deletedItem = {categoryId : data.Id}
      }
    });
    console.log(this.selectedDeletItem);
    this._wareefService.deleteWareef(this.selectedDeletItem).subscribe(
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
          this.selectedDeletItem = null;
          this.initializeData();
        } else {
          this._translate.get("common.deleteFailed").subscribe((res) => {
            this._toastrService.error(res);
            this.deleteDialog = false;
            this.loading = false;
            this.selectedDeleteId = null;
            this.selectedDeletItem = null;
          });
        }

        this.loading = false;
        this.deleteDialog = false;
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
    this.AddForm.reset();
    this.AddDailog = true;
    this.showeditDailog = false;
  }
  SubmitAddItem() {
    console.log(this.AddForm.value);
    this._wareefService.addWareef(this.AddForm.value).subscribe(
      (data: any) => {
        console.log(data);
        if (data.data.ErrorCode == 1) {
          this._toastrService.success(data.data.ErrorDescription);
          this.initializeData();
          this.AddDailog = false;
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }
      }

      // (error: any) => {
      //   this.loading = false;
      //   this.firstTime = false;
      //   this.isSearch = false;
      //   if (error.errors) {
      //     error.errors.forEach((item) => {
      //       this._toastrService.error(item.code, item.description);
      //     });
      //   }
      // }
    );
  }

  handleFileInput(files: FileList) {
    if(this.showeditDailog)
    {
      this.fileToUpload = files.item(0);
      this.blobToBase64(this.fileToUpload).then((res) => {
        this.selectedEditedItem.ImageData.newImageData = res as string;
      });
    }
    else
    {
    this.fileToUpload = files.item(0);
    this.blobToBase64(this.fileToUpload).then((res) => {
      this.AddForm.value.imageData.imageData = res as string;
    });
  }
  }
  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

}
