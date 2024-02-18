export class Partners {
    Id: number;
    NameAr: string;
    NameEn: string;
    constructor(
      Id?: number,
      NameAr?: string,
      NameEn?: string,

    ) {
      this.Id = Id || null;
      this.NameAr = NameAr || null;
      this.NameEn = NameEn || null;
    }
  }