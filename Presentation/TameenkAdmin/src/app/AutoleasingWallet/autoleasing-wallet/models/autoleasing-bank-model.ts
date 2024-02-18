import { Type } from "@angular/core";
export class BankAccountModel {
  id: string;
  nameEn: string;
  nameAr: string;
  balance: number;
  lang: string;
  isActive: boolean;
  isAcitveWallet:boolean;
  hasWallet:boolean;
  purchaseByNegative:boolean;
}
