export class AddCategoryModel {
    id?: number;
    nameAr: string;
    nameEn: string;
    icon: string;
    constructor(
      id?:number,
        nameAr?: string,
        nameEn?: string,
       icon?: string
    ) {
      this.nameAr = nameAr || null;
      this.nameEn = nameEn ||null;
      this.icon = icon ||null
      this.id = id || null;
    }
  }
