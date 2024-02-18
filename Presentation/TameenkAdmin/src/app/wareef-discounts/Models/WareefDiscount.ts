import { CustomDiscountBenefits } from "./CustomDiscountBenefits";
import { DiscountDetail } from "./WareefDiscountDetails";

export class WareefDiscount {
  Id: number;
  WareefId: number;
  DescountValue: string;
  WDescountCode: string;
  customDiscountBenefits: CustomDiscountBenefits[];
  discountDetails: DiscountDetail[];

  constructor(
    Id?: number,
    wareefId?: number,
    discountValue?: string,
    wareefDiscountCode?: string
  ) 
  {
    this.Id = Id || null;
    this.WareefId = wareefId || null;
    this.DescountValue = discountValue || null;
    this.WDescountCode = wareefDiscountCode || null;
  }
}
