import { AdminPolicyService, LocalizationService } from "src/app/core/services";
import { Component, OnInit } from "@angular/core";

import { CodeTypesModel } from "./Models/CodeTypesModel";
import { CommonResponse } from "src/app/core/models";
import { RenewalPoliciesMessgeFilterModel } from "./Models/renewal-policies-messge-filter-model";
import { RenewalPoliciesMessgeModel } from "./Models/renewal-policies-messge-model";
import { RenewalPolicyDetailsModel } from "./Models/renewal-policy-details-model";
import { ResultModel } from "./Models/ResultModel";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-renewal-policies-message",
  templateUrl: "./renewal-policies-message.component.html",
  styleUrls: ["./renewal-policies-message.component.css"],
})
export class RenewalPoliciesMessageComponent implements OnInit {
  filterModel = new RenewalPoliciesMessgeFilterModel();
  message = new RenewalPoliciesMessgeModel();
  dataList: ResultModel[] = [];
  selected = new RenewalPolicyDetailsModel();
  dataListCount;
  loading: boolean;
  loading2: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  openPpUp = false;
  clicked = false;
  isSearch = false;
  change:boolean;
  codeErrorDiv = false;
  codeErrorDivMessage = "";
  messageTypes;
  discountTypes: CodeTypesModel[];
  discountTypesEn = [
    { key: 1, value: "By Value" },
    { key: 2, value: "By Percentage" },
  ];
  discountTypesAr = [
    { key: 1, value: "قيمة ثابتة" },
    { key: 2, value: "نسبة" },
  ];
  constructor(
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _policyService: AdminPolicyService
  ) {}

  ngOnInit() {
    this.loading = false;
    this.change=false;
    this.loading2 = false;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
        ? true
        : false;

    this.filterModel.lang = this.isEnglish ? "en" : "ar";
    this.message.lang = this.isEnglish ? "en" : "ar";
    this.InitializeNewModel();
    this.getDiscounts();
  }

  InitializeNewModel() {
    this.message.referenceId = null;
    this.message.externalId = null;
    this.message.expiryDate = null;
    this.message.vehicleModel = null;
    this.message.vehiclemaker = null;
    this.message.code = null;
    this.message.discountType = null;
    this.message.percentage = null;
    this.message.startDate = this.today;
    this.message.endDate = this.today;
    this.message.customCardNumber = null;
    this.message.sequenceNumber = null;
    this.message.nIN = null;
  }

  filterClick(e) {
    this.isSearch = true;
    console.log(this.filterModel);
    this.loading = true;
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    const pageIndex = event.first / event.rows + 1;
    const pageInSize = event.rows;
    this.HandleInitializeingData(pageIndex, pageInSize);
  }
  HandleInitializeingData(pageIndex, pageInSize) {
    this.filterModel.pageNumber = pageIndex;
    this.filterModel.pageSize = pageInSize;
    this._policyService.getRenewalDataWithFilter(this.filterModel).subscribe(
      (data: CommonResponse<any>) => {
        console.log("HandleInitializeingData data");
        console.log(data);
        this.dataList = [];
        this.dataListCount = 0;
        if (data.data.ErrorCode == 1) {
          this.dataList = data.data.Result;
          console.log(this.dataList);
          this.dataListCount = data.totalCount;
        }
        this.isSearch = false;
        this.loading = false;
      },
      (error: any) => {
        this.isSearch = false;
        this.loading = false;
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  showPopup(item) {
    this.InitializeNewModel();
    this.message.referenceId = item.referenceId;
    this.message.externalId = item.externalId;
    this.message.expiryDate = item.policyExpiryDate;
    this.message.vehicleModel = item.vehicleModel;
    this.message.vehiclemaker = item.vehiclemaker;
    this.message.phone = item.phone;
    this.message.sequenceNumber = item.sequenceNumber;
    this.message.customCardNumber = item.customCardNumber;
    this.message.nIN = item.nIN;
    this.message.code = item.code;
    this.message.discountType = item.discountType;
    this.message.percentage = null;
    this.openPpUp = true;
  }

  closeModal() {
    this.openPpUp = false;
    this.clicked = false;
    this.change=false;
  }

  getDiscounts() {
    this._policyService.getDiscountsType().subscribe(
      (data: CommonResponse<any>) => {
        if (data.data.ErrorCode == 1) {
          this.discountTypes = data.data.Result;
          console.log("discountTypes");

          console.log(this.discountTypes);
        }
        this.isSearch = false;
        this.loading = false;
      },
      (error: any) => {}
    );
  }

  restrictNumeric(e) {
    let input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  SendRenewalMessage() {
    this.clicked = true;
    this.loading2 = true;
    console.log(this.message);
    this._policyService.sendRenewalMessage(this.message).subscribe(
      (data: CommonResponse<any>) => {
        console.log("HandleInitializeingData data");
        if (data.data.ErrorCode === 1) {
          console.log("jsooon");
          console.log(data.data);
          this._toastrService.success(data.data.ErrorDescription);
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }
        this.loading2 = false;
        this.codeErrorDivMessage = "";
        this.codeErrorDiv = false;
        this.change=false;
        this.closeModal();
      },
      (error: any) => {
        this.loading2 = false;
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.description, item.code);
          });
        }
      }
    );
  }
  changeDiscountType(e) {
    // console.log(this.discountTypes);
    // console.log(JSON.parse(e.target.value).Code);
    // console.log(typeof e);
     this.message.discountType = JSON.parse(e.target.value).DiscountType;
     this.message.code=JSON.parse(e.target.value).Code;
     console.log(this.message);
     this.change=true;
  }
}
