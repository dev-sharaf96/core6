export interface CategoryData {
  Id: number;
  NameAr: string;
  NameEn: string;
  Icon: string;
  IsDeleted: boolean;
  Createdby: string;
  CreatedDateTime?: Date;
  ModifiedDate?: any;
  ModifiedBy?: any;
}

export interface WareefItems {
    Id: number;
    NameAr: string;
    NameEn: string;
    WareefCategoryId: number;
    ImageBytes: string;
    ItemURl: string;
}
export interface Data {
  ErrorDescription: string;
  ErrorCode: number;
  Data?: WareefItems[];
  CategoryData: CategoryData[];
  DiscountData?: any;
  DiscountBenefits?: any;
}

export interface WareefDataModel {
  data: Data;
  totalCount: number;
  errors?: any;
}


