import { CategoryModel } from "./CategoryModel";
import { images } from "./Images";

export class WareefModel {
    Id: number;
    Createdby: string;
    CreatedDateTime: Date;
    Name: string;
    ImageBytes:string;
    DescriptionAr:string;
    DescriptionEn:string;
    IsDeleted:boolean;
    ModifiedDate:Date;
    ModifiedBy:string;
    WareefCategoryId:number

    constructor(
        Id?: number,
        Createdby?: string,
        CreatedDateTime?: Date,
        Name?: string,
        ImageBytes?: string,
        DescriptionAr?: string,
        DescriptionEn?: string,
        IsDeleted?: boolean,
        ModifiedDate?: Date,
        ModifiedBy?: string,
        WareefCategoryId?: number,

    ) {
      this.Id = Id || 0;
      this.Createdby = Createdby || null;
      this.CreatedDateTime = CreatedDateTime ||null;
      this.Name = Name ||null;
      this.ImageBytes = ImageBytes ||null;
      this.DescriptionAr = DescriptionAr ||null;
      this.DescriptionEn = DescriptionEn ||null;
      this.IsDeleted = IsDeleted ||null;
      this.ModifiedDate = ModifiedDate ||null;
      this.ModifiedBy = ModifiedBy ||null;
      this.WareefCategoryId = WareefCategoryId ||null;
    }
  }

  export class WareefBackModel {
    Id: number;
    ImageBytes: string;
    ItemURl:string;
    NameAr: string;
    NameEn:string;
    WareefCategoryId: number;

    constructor(
      Id?: number,
      ImageBytes?: string,
      ItemURl?:string,
      NameAr?: string,
      NameEn?:string,
      WareefCategoryId?: number

    ) {
      this.Id = Id || 0;
      this.ImageBytes = ImageBytes || null;
      this.ItemURl = ItemURl || null;
      this.NameAr = NameAr || null;
      this.NameEn =NameEn|| null;
      this.WareefCategoryId = WareefCategoryId || 0;
    }
  }

  export class WareefEditModel {
    Id: number;
    ImageData: images;
    NameAr: string;
    NameEn:string;
    Category: CategoryModel;

    constructor(
      Id?: number,
      NameAr?: string,
      NameEn?:string

    ) {
      this.Id = Id || 0;
      this.ImageData = new images(null);
      this.NameAr = NameAr || null;
      this.NameEn =NameEn|| null;
      this.Category = new CategoryModel();
    }
  }
