import { WareefBenefitDetails } from "./WareefBenefitDetails";
import { images } from "./Images";

export class AddWareefModel {
  nameAr: string;
  nameEn:string;
    imageData: images;
    discountAr: string;
    discountEn:string;
    categoryId:number;
    wareefDiscountBenefits:WareefBenefitDetails;
    constructor(
      nameAr?: string,
      nameEn?: string,
        imageData?: images,
        discountAr?: string,
        discountEn?: string,
        categoryId?: number,
        wareefDiscountBenefits?: WareefBenefitDetails
    ) {
      this.nameAr = nameAr || null;
      this.nameEn = nameEn || null;
      this.imageData = imageData ||null;
      this.discountAr = discountAr ||null;
      this.discountEn = discountEn ||null;
      this.categoryId = categoryId ||null;
      this.wareefDiscountBenefits = wareefDiscountBenefits ||null;
    }
  }