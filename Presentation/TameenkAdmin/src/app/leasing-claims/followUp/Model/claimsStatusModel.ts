
 export class ClaimsStatusModel {
    StatusCode :number | null;
    StatusNameAr :string | null;
    StatusNameEn :string | null;
   
      constructor(
        StatusCode? :number,
        StatusNameAr? :string,
        StatusNameEn? :string
       
      ) {
        this.StatusCode = StatusCode || null;
        this.StatusNameAr = StatusNameAr || null;
        this.StatusNameEn = StatusNameEn || null;
      }
  }