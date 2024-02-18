export class PolicyCheckoutModel {
  id:number;
  nin:string;
  phone: string;
  email: string;
  iban: string;
  createdDate:Date;
  createdBy:string;
  modifiedDate:Date;
  modifiedBy:string;
  isDeleted:boolean;
  deletedDate:Date;
  deletedBy:string;
}
