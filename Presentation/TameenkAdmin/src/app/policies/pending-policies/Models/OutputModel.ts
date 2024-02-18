import { DataModel } from "./data-model";

export interface OutputModel {
  data: DataModel;
  totalCount: number;
  errors?: any;
}
