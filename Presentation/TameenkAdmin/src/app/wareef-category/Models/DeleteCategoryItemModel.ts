export class DeleteCategoryItemModel {
    categoryId: number;

    constructor(
        categoryId?: number,
    ) {
      this.categoryId = categoryId || 0;

    }
  }