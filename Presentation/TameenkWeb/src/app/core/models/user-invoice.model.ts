import { IUser } from '.';

export interface IUserInvoice {
  id: number;
  invoiceNo: number;
  invoiceDate: Date;
  invoiceDueDate: Date;
  userId: string;
  referenceId: string;
  insuranceTypeCode: number;
  insuranceCompanyId: number;
  policyId: number;
  productPrice: number;
  extraPremiumPrice: number;
  discount: number;
  fees: number;
  vat: number;
  subTotalPrice: number;
  totalPrice: number;
  user: IUser;
  insuranceCompanyNameAr: string;
  insuranceCompanyNameEn: string;
  insuranceCompanyName: string;
}
