import { DataModel } from "./DataModel";

export interface QuotationOutputModel {
  data: DataModel;
  totalCount: number;
  errors?: any;
}
