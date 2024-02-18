

export class WareefCategoryModel {
    Id: number;
    Createdby: string;
    CreatedDateTime: Date;
    NameAr: string;
    NameEn: string;
    Icon:string;
    DescriptionAr:string;
    DescriptionEn:string;
    IsDeleted:boolean;
    ModifiedDate:Date;
    ModifiedBy:string;
    constructor(
        Id?: number,
        Createdby?: string,
        CreatedDateTime?: Date,
        NameAr?: string,
        NameEn?: string,
        Icon?: string,
        DescriptionEn?: string,
        IsDeleted?: boolean,
        ModifiedDate?: Date,
        ModifiedBy?: string,
    ) {
      this.Id = Id ||null;
      this.Createdby = Createdby ||null;
      this.CreatedDateTime = CreatedDateTime ||null;
      this.NameAr = NameAr ||null;
      this.NameEn = NameEn ||null;
      this.Icon = Icon ||null;
      this.DescriptionEn = DescriptionEn ||null;
      this.IsDeleted = IsDeleted ||null;
      this.ModifiedDate = ModifiedDate ||null;
      this.ModifiedBy = ModifiedBy ||null;

    }
  }