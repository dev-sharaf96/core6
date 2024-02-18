import { SortEvent } from "primeng/api";

export class SuccessFilter {
  insuranceCompanyId: number;
  invoiceNo: number;
  nationalId: string;
  insuredFirstNameAr: string;
  insuredLastNameAr: string;
  insuredEmail: string;
  policyNo: string;
  sequenceNo: string;
  customNo: string;
  referenceNo: string;
  productTypeId: number;
  najmStatusId: number;
  endDate: Date;
  startDate: Date;
  channel:number;
  merchantId:string;
  pageIndex:number;
  pageSize:number;
  isExcel:boolean;
    constructor(
      insuranceCompanyId?: number,
      invoiceNo?: number,
      nationalId?: string,
      insuredFirstNameAr?: string,
      insuredLastNameAr?: string,
      insuredEmail?: string,
      policyNo?: string,
      sequenceNo?: string,
      customNo?: string,
      referenceNo?: string,
      productTypeId?: number,
      najmStatusId?: number,
      endDate?: Date,
      startDate?: Date,
      channel?:number,
      merchantId?:string,
      pageIndex?:number,
      pageSize?:number,
     isExcel?:boolean

    ) {
      this.insuranceCompanyId = insuranceCompanyId || null;
      this.invoiceNo = invoiceNo || null;
      this.nationalId = nationalId || '';
      this.insuredFirstNameAr = insuredFirstNameAr || '';
      this.insuredLastNameAr = insuredLastNameAr || '';
      this.insuredEmail = insuredEmail || '';
      this.policyNo = policyNo || '';
      this.sequenceNo = sequenceNo || '';
      this.customNo = customNo || '';
      this.referenceNo = referenceNo || '';
      this.productTypeId = productTypeId || null;
      this.najmStatusId = najmStatusId || null;
      this.endDate = endDate || null;
      this.startDate = startDate || null;
      this.channel = channel || null;
      this.merchantId=merchantId||null;
      this.pageIndex=pageIndex||null;
      this.pageSize=pageSize||null;
      this.isExcel=isExcel||null

      
    }
}
