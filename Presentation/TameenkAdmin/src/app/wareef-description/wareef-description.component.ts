import {Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, IIdNamePairModel, LocalizationService } from '../core';
import { WareefService } from '../core/services/wareef.service';
import { WareefCategoryModel } from '../wareef-category/Models/WareefCategory';
import { DiscountDescription } from './Models/DiscountDescription';
import { PartnersDiscounts } from './Models/PartnerDiscounts';
import { Partners } from './Models/Partners';

@Component({
  selector: 'app-wareef-description',
  templateUrl: './wareef-description.component.html',
  styleUrls: ['./wareef-description.component.css']
})
export class WareefDescriptionComponent implements OnInit {
  categoryList: IIdNamePairModel[];
  Category: IIdNamePairModel;
  PartenerList: IIdNamePairModel[];
  DiscountList: IIdNamePairModel[];
  Parteners: IIdNamePairModel;
  Categories: WareefCategoryModel[];
  AllCategorydata: any;
  AllParteners:any;
  PartnerData:Partners[];
  AllPartenerDiscounts:any;
  PartnerDiscounts:PartnersDiscounts[];
  isEnglish: boolean;
  CategoryItem;
  selectedCategoryValue: number;
  selectedDiscountId:number=0;
  AllDescriptionData;
  DescriptionList:DiscountDescription[];
  UpdateForm :[]
  updateDialoge=false;
  constructor(
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _wareefService: WareefService,
  ) { 


    this.isEnglish =
    this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
      ? true
      : false;
  }

  ngOnInit() {
    this.updateDialoge=false;
    this.DescriptionList=[];
    this.selectedCategoryValue = 0;
    this.getCategorylist();
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

getParteners(CategoryId:number){
this._wareefService.getcatecoryPartners(CategoryId).subscribe(
      (data: CommonResponse<any>) => {
       // this.Categories = [];
        this.PartenerList = [];
        this.AllParteners = data.data;
        this.PartnerData = this.AllParteners.WarefParteners;
        this.PartnerData.forEach((item) => {
          let model = new IIdNamePairModel();
          model.id = item.Id;
          model.name = this.isEnglish ? item.NameEn : item.NameAr;
          this.PartenerList.push(model);
        });
        // this.CategoryItem = this.categoryList.find(
        //   (c) => c.id === this.selectedCategoryValue
        // );
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
getPartenerDiscounts(CategoryId:number){
  this._wareefService.getPartnerDiscounts(CategoryId).subscribe(
        (data: CommonResponse<any>) => {
         // this.Categories = [];
          this.DiscountList = [];
          this.AllPartenerDiscounts = data.data;
          this.PartnerDiscounts = this.AllPartenerDiscounts.DiscountData;
          this.PartnerDiscounts.forEach((item) => {
            let model = new IIdNamePairModel();
            model.id = item.Id;
            model.name = this.isEnglish ? item.DescountValue : item.DescountValue;
            this.DiscountList.push(model);
          });
          // this.CategoryItem = this.categoryList.find(
          //   (c) => c.id === this.selectedCategoryValue
          // );
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
    this.PartenerList = [];
    this.DiscountList=[];
    this.selectedDiscountId=0;
    this.getParteners(event.value.id);
  }
  changeWareefItem(event) {
    this.DiscountList=[];
    this.selectedDiscountId=0;
   this.getPartenerDiscounts(event.value.id);
  }
  changeWareefDiscountId(event) {
    this.selectedDiscountId=event.value.id;
    console.log("discount",this.selectedDiscountId);
  }
  

  getDiscountDetails(selectedDiscountId){
    this._wareefService.getDiscountDescription(selectedDiscountId).subscribe(
      (data: CommonResponse<any>) => {
        this.AllDescriptionData = data.data;
        this.DescriptionList= new Array<DiscountDescription> ();
        this.DescriptionList = this.AllDescriptionData.DiscountBenefits;
        this.updateDialoge=true;
        console.log("data is ",this.DescriptionList);
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


  OnSubmit(){
    this._wareefService.EditBenefitDescription(this.DescriptionList).subscribe(
      (data: CommonResponse<any>) => {
        console.log("req is ",this.DescriptionList);
        this.AllDescriptionData = data.data;
        console.log("data is ",this.AllDescriptionData);
        if(data.data.ErrorCode){
           this.updateDialoge=false;
           this.selectedDiscountId=0;
          this._toastrService.success(data.data.ErrorDescription);
        }
        else {
          this.updateDialoge=false;
          this.selectedDiscountId=0;
          this._toastrService.error(data.data.ErrorDescription);
        }
      }
     
    );

  }
}

