import { CommonResponse, NajmStatus } from "src/app/core";
import { Injectable, Injector } from "@angular/core";

import { ApiService } from "./api.service";
import { WareefCategoryModel } from "src/app/wareef-category/Models/WareefCategory";
import { WareefModel } from "src/app/wareef/Models/WareefModel";
import { environment } from "src/environments/environment";
import { WareefDiscount } from "src/app/wareef-discounts/Models/WareefDiscount";
import { WareefDataModel } from "src/app/wareef-discounts/Models/WareefDataModel";
import { Partners } from "src/app/wareef-description/Models/Partners";
import { PartnersDiscounts } from "src/app/wareef-description/Models/PartnerDiscounts";
 import { DiscountDescription } from "src/app/wareef-description/Models/DiscountDescription";
import { Observable } from "rxjs";
import { OutputModel } from "../models/output-model";

@Injectable({
  providedIn: "root",
})
export class WareefService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);

    this.apiUrl = environment.administrationUrl + "Wareef/";
  }
  //#region Wareef Item
  //  editWareef(body)
  //  {
  //    return super.put('edit', body);

  //  }

  deleteWareef(body) {
    return super.post("Delete", body);
  }
  addWareef(body) {
    return super.post("Add", body);
  }
  editWareef(body) {
    return super.post("Edit", body);
  }
  getAll() {
    return super.get<CommonResponse<WareefModel[]>>("All");
  }

  getAllWareefData() {
    return super.get<CommonResponse<WareefDataModel[]>>("All");
  }

  //#endregion
  //#region Category
  getAllCategory() {
    return super.get<CommonResponse<WareefCategoryModel[]>>("AllCategory");
  }
  addWareefCategory(body) {
    return super.post("AddCategory", body);
  }
  DeleteCategory(body) {
    return super.post("DeleteCategory", body);
  }
  EditCategory(body) {
    return super.post("EditCategory", body);
  }
  //#endregion

  // #region discounts
  getAllDiscounts() {
    return super.get<CommonResponse<WareefDiscount[]>>("AllWareefDiscounts");
  }
  addWareefDiscount(body) {
    return super.post("AddDiscount", body);
  }
  deleteDiscount(body) {
    return super.post("DeleteDiscount", body);
  }
  editDiscount(body) {
    return super.post("EditDiscount", body);
  }
  // #end region discount

   getcatecoryPartners(id: number) {
    return super.get<CommonResponse<Partners>>('GetCategoryPartners', `categoryId=${id}`);
  }
  getPartnerDiscounts(id: number) {
    return super.get<CommonResponse<PartnersDiscounts>>('PartnerDiscounts', `partnerId=${id}`);
  }
  getDiscountDescription(id: number) {
    return super.get<CommonResponse<DiscountDescription>>('DiscountBenfitsDescription', `DiscountId=${id}`);
  }
  EditBenefitDescription(body) {
    return super.post("EditDiscountBenefitDescription", body);
  }
  uploadDataFile(body): Observable<CommonResponse<OutputModel>> {
    return super.post<CommonResponse<OutputModel>>('UploadWareefDiscount', body);
  }
}
