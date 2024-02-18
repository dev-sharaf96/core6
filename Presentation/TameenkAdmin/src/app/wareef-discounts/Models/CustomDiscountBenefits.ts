export class CustomDiscountBenefits {
    Id: number;
    DiscountValue: string;
    WareefId: number;
    WareefDiscountCode: string;
    NameEn: string;
    NameAr: string;

      constructor(
        id?: number,
        discountValue?: string,
        wareefId?: number,
        wareefDiscountCode?: string,
        nameEn?: string,
        nameAr?: string
      ) {
        this.Id = id || null;
        this.DiscountValue = discountValue || null;
        this.WareefId = wareefId || null;
        this.WareefDiscountCode = wareefDiscountCode || null;
        this.NameEn = nameEn || null;
        this.NameAr = nameAr || null;
      }
  }
  