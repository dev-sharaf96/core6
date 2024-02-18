export class RenewalDiscountModel {
  id: number;
  code: string;
  percentage: number;
  value: number;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  userId: number;
  isActive: boolean;
  createdDate: Date;
  messageType: number;
  messageTypeText: string;
  discountType: number;
  codeType: number;
  lang: string;
}
