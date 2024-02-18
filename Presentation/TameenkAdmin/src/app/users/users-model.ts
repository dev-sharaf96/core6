export class UserModel {
  id:string;
  createdDate:Date;
  lastModifiedDate: Date;
  lastLoginDate: Date;
  languageNameAr: string;
  languageNameEN: string;
  email:string;
  emailConfirmed:boolean;
  phoneNumber:string;
  phoneNumberConfirmed:boolean;
  lockoutEndDateUtc:Date;
  lockoutEnabled:boolean;
  accessFailedCount:number;
  userName:string;
  fullName:string;
  isLocked:boolean;
  LockedBy:string;
  LockedReason:string;
  isPhoneVerifiedByYakeen: boolean;
  nationalId: string;
  fullNameAr: string;
}
