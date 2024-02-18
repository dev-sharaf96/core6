export class PartnersDiscounts {
    Id: number;
    WareefId: number;
    DescountValue: string;
    WDescountCode: string;
    constructor(
      Id?: number,
      WareefId?: number,
      DescountValue?: string,
      WDescountCode?: string,

    ) {
      this.Id = Id || null;
      this.WareefId = WareefId || null;
      this.DescountValue = DescountValue || null;
      this.WDescountCode = WDescountCode || null;
    }
  }