import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  CommonResponse,
  IIdNamePairModel,
  LocalizationService,
} from "src/app/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { WareefDataModel, WareefItems } from "./Models/WareefDataModel";

import { AddWareefModel } from "../wareef/Models/AddWareefModel";
import { DeleteItemModel } from "./Models/DeleteItemModel";
import { DiscountDetail } from "./Models/WareefDiscountDetails";
import { DomSanitizer } from "@angular/platform-browser";
import { EditModel } from "./Models/EditModel";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { WareefCategoryModel } from "../wareef-category/Models/WareefCategory";
import { WareefDiscount } from "./Models/WareefDiscount";
import { WareefModel } from "../wareef/Models/WareefModel";
import { WareefService } from "../core/services/wareef.service";
import { Alert } from "selenium-webdriver";
import { CustomDiscountBenefits } from "./Models/CustomDiscountBenefits";

@Component({
  selector: "app-wareef-discounts",
  templateUrl: "./wareef-discounts.component.html",
  styleUrls: ["./wareef-discounts.component.css"],
})
export class WareefDiscountsComponent implements OnInit {
  category: IIdNamePairModel;
  wareefId: any;
  categoryId: any;
  discountValue: any;
  wareefDiscountCode: any;
  data: any;
  AllData: WareefDiscount[];
  customDiscountBenefits: CustomDiscountBenefits[] = [];
  AllBenefitData: DiscountDetail[];
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
  selectedWareefItemValue: number;

  AllCategorydata: any;
  AllWareefData: WareefItems[];
  Categories: WareefCategoryModel[];
  WareefItems: WareefItems[];
  ListItem: IIdNamePairModel;
  itemList: IIdNamePairModel[];
  categoryList: IIdNamePairModel[];
  editDiscountValue: string;
  editDiscountDetails: any;
  editWareefId: number;
  editWareefCode: string;
  selectedEditedItem5: EditModel;
  CategoryItem;
  WareefItem;
  deleteDialog: boolean = false;
  selectedDeleteId = null;
  showeditDailog = null;
  selectedEditedItem: EditModel;
  wareeeef: any;
  WarfItems: WareefItems[];
  deletedItem: DeleteItemModel;
  AddForm = this.fb.group({
    discountValue: ["", Validators.required],
    item: this.fb.group({
      id: [null],
      name: ["",Validators.required],
    }),
    wareefDiscountCode: ["", Validators.required],
    category: this.fb.group({
      id: [null],
      name: ["",Validators.required],
    }),
    wareefDiscountBenefits: this.fb.array([]),
  });
  EditForm = this.fb.group({
    discountValue: ["", Validators.required],
    item: this.fb.group({
      id: [null],
      name: ["",Validators.required],
    }),
    wareefDiscountCode: ["", Validators.required],
    category: this.fb.group({
      id: [null],
      name: ["",Validators.required],
    }),
    wareefDiscountEditBenefits: this.fb.array([]),
    wareefName: [""],
    //wareefDiscountBenefits: this.fb.array([]),
  });
  get wareefName() {
    return this.EditForm.get("wareefName");
  }
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

  initializeData() {
    this.loading = true;
    this._wareefService.getAllDiscounts().subscribe(
      (data: CommonResponse<WareefDiscount[]>) => {
        this.data = data.data;
        this.AllData = this.data.DiscountData;
        this.AllBenefitData = this.data.DiscountBenefits;
        // this.AllData.forEach(x=>x.Id = this.data.customDiscountBenefits.id);
        this.customDiscountBenefits = this.data.customDiscountBenefits;

        // console.log("all data", this.AllData);
        // console.log("DiscountBenefits",this.data.DiscountBenefits);
        // console.log("list", this.data.customDiscountBenefits)
        // console.log("DiscountData",this.data.DiscountData);
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
  ngOnInit() {
    this.selectedEditedItem = new EditModel();
    this.selectedEditedItem5 = new EditModel();
    this.editDiscountDetails = null;
    this.editDiscountValue = "";
    this.editWareefCode = "";
    this.editWareefId = 0;
    this.deletedItem = null;
    this.wareeeef = null;
    this.showeditDailog = false;
    this.deleteDialog = false;
    this.selectedDeleteId = null;
    this.itemList = [
      {
        id: null,
        name: null,
      },
    ];
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
    this.getWareefItemList();
  }

  changeCategory(event) {
    this.AddForm.value.category.id = event.value.id;
    console.log(this.AddForm.value.category.id);
  }
  changeWareefItem(event) {
    this.AddForm.value.item.id = event.value.id;
    console.log(this.AddForm.value.item.id);
  }
  changeWareefItemEdit(event) {
    this.selectedEditedItem5.Item.id = event.value.id;
    console.log(this.selectedEditedItem5.Item.id);
  }
  changeCategoryEdit(event) {
    this.selectedEditedItem5.categoryId = event.value.id;
    console.log(this.selectedEditedItem5.categoryId);
  }
  ShowAddItem() {
    this.AddForm.reset();
    this.AddDailog = true;
  }
  Edit() {
    // this.AllData.forEach((item) => {
    //   if (item.Id == id) {
    //     // Update the data
    //   }
    // });
    // debugger;
    this.loading = true;
    this.showeditDailog = false;
    // this.EditForm.wareefDiscountEditBenefits.forEach(element => {

    // });
    this.wareefDiscountEditBenefits.value.forEach((item) => {
      item.descountId = this.selectedEditedItem5.Id;
    });
    this.selectedEditedItem5.wareefDiscountBenefits =
      this.wareefDiscountEditBenefits.value;
    this._wareefService
      .editDiscount(this.selectedEditedItem5)
      .subscribe((data: any) => {
        console.log(data);
        if (data.data.ErrorCode == 1) {
          this.loading = false;
          this._toastrService.success(data.data.ErrorDescription);
          this.initializeData();
        } else {
          this.loading = false;
          this._toastrService.error(data.data.ErrorDescription);
        }
      });
  }
  ShowEdit(id) {
    console.log("Id >> " + id);
    while (this.wareefDiscountEditBenefits.length) {
      this.wareefDiscountEditBenefits.removeAt(0);
    }
    //this.wareefDiscountEditBenefits.clearValidators();
    this.showeditDailog = true;
    this.selectedEditedItem5.wareefDiscountBenefits = [];
    this.selectedEditedItem5.Item = new IIdNamePairModel();
    this.AllData.forEach((item) => {
      if (item.Id == id) {
        //this.selectedEditedItem5 = item;
        this.selectedEditedItem5.Id = item.Id;
        this.selectedEditedItem5.discountValue = item.DescountValue;
        this.selectedEditedItem5.wareefDiscountCode = item.WDescountCode;
        this.selectedEditedItem5.wareefDiscountBenefits = item.discountDetails;
        this.selectedEditedItem5.Item = this.itemList.find(
          (x) => x.id == item.WareefId
        );
        // this.selectedEditedItem5.Id = item.Id;
        // this.discountValue = item.DescountValue;
        // this.wareefDiscountCode = item.WDescountCode;
        // this.selectedEditedItem5.discountDetails = item.discountDetails;
        // this.wareefId = this.itemList.find(x=>x.id == item.WareefId);

        ////MockUp
        // this.wareefDiscountEditBenefits.push(this.benefitEditForm("asd","vcxbcvbcv"));
        // this.wareefDiscountEditBenefits.push(this.benefitEditForm("werew","new"));
        // this.wareefDiscountEditBenefits.push(this.benefitEditForm("hjk","hjkh"));
        this.AllBenefitData.forEach((item2) => {
          if (item2.DescountId == item.Id) {
            this.wareefDiscountEditBenefits.push(
              this.benefitEditForm(
                item2.BenefitDescriptionAr,
                item2.BenefitDescriptionEn,
                item2.DescountId
              )
            );
          }
        });

        console.log(this.selectedEditedItem5);

        // this.editDiscountDetails = item.discountDetails;
        // this.editDiscountValue = item.discountValue;

        /*
         this.EditForm.setValue({
          discountValue : item.discountValue,
          discountDetails : item.discountDetails,
        })

        */
      }
    });
    this.selectedEditedItem5.wareefDiscountBenefits =
      this.wareefDiscountEditBenefits.value;
  }
  SubmitAddItem() {
    console.log(this.AddForm.value);
    this._wareefService
      .addWareefDiscount(this.AddForm.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.data.ErrorCode == 1) {
          this._toastrService.success(data.data.ErrorDescription);
          this.initializeData();
          this.AddDailog = false;
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }
      });
  }
  showDeleteDialog(id) {
    this.deleteDialog = true;
    this.selectedDeleteId = id;
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
  delete() {
    this.loading = true;
    this.AllData.forEach((data) => {
      console.log(data.Id);
      if (data.Id == this.selectedDeleteId) {
        this.selectedDeleteId = data.Id;
        console.log("Selected >>>>>" + this.selectedDeleteId);
        console.log("Data >>>>>>" + data.Id);

        this.deletedItem = { discountId: data.Id };
      }
    });
    this._wareefService.deleteDiscount(this.deletedItem).subscribe(
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
            this.deleteDialog = false;
            this.loading = false;
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

  getWareefItemList() {
    this._wareefService.getAllWareefData().subscribe(
      (data: CommonResponse<WareefDataModel[]>) => {
        this.WareefItems = [];
        this.itemList = [];
        this.wareeeef = data.data;
        this.WarfItems = this.wareeeef.Data;
        this.WarfItems.forEach((item) => {
          let model = new IIdNamePairModel();
          model.id = item.Id;
          model.name = this.isEnglish ? item.NameEn : item.NameAr;
          this.itemList.push(model);
        });

        this.WareefItem = this.itemList.find(
          (c) => c.id === this.selectedWareefItemValue
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
  get wareefDiscountBenefits() {
    return this.AddForm.get("wareefDiscountBenefits") as FormArray;
  }
  get wareefDiscountEditBenefits() {
    return this.EditForm.get("wareefDiscountEditBenefits") as FormArray;
  }
  benefitForm() {
    return this.fb.group({
      benefitDescriptionAr: [null, Validators.required],
      benefitDescriptionEn: [null, Validators.required],
    });
  }
  benefitEditForm(benefitAr, benefitEn, descId) {
    return this.fb.group({
      benefitDescriptionAr: [benefitAr, Validators.required],
      benefitDescriptionEn: [benefitEn, Validators.required],
      descountId: [descId],
    });
  }
  addcontrol() {
    this.wareefDiscountBenefits.push(this.benefitForm());
  }
  addEditcontrol() {
    this.wareefDiscountEditBenefits.push(
      this.benefitEditForm(null, null, null)
    );
  }
  remove(i) {
    this.wareefDiscountBenefits.removeAt(i);
  }
  removeEdit(i) {
    this.wareefDiscountEditBenefits.removeAt(i);
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };
}
