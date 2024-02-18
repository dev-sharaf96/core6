export class DeleteItemModel {
    discountId: number;

    constructor(
        discountId?: number,
    ) {
      this.discountId = discountId || 0;

    }
  }