import { IIdNamePairModel } from "src/app/core/models";
import { DiscountDetail } from "./WareefDiscountDetails";

export class EditModel {
  Id: number;
  Item: IIdNamePairModel;
  categoryId: number;
  discountValue: string;
  wareefDiscountCode: string;
  wareefDiscountBenefits: DiscountDetail[];
  constructor(
    Id?: number,
    item?: IIdNamePairModel,
    discountValue?: string,
    WDiscountCode?: string
  ) {
    this.Id = Id || null;
    this.Item = item || null;
    this.discountValue = discountValue || null;
    this.wareefDiscountCode = WDiscountCode || null;
  }
}
