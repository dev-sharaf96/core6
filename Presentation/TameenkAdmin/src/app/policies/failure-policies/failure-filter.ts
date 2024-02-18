export class FailureFilter {
        insuredPhone: string;
        insuranceCompanyId: number;
        invoiceNo: number;
        nationalId: string;
        insuredFirstNameAr: string;
        insuredLastNameAr: string;
        insuredEmail: string;
        sequenceNo: string;
        customNo: string;
        referenceNo: string;
        productTypeId: number;
        endDate: Date;
        startDate: Date;
        policyStatusId: number;
        channel:number;
        merchantId:string;
        pageIndex:number;
        pageSize:number;
        sortOrder:boolean;
        isExcel:boolean

    constructor(
      insuredPhone?: string,
      insuranceCompanyId?: number,
      invoiceNo?: number,
      nationalId?: string,
      insuredFirstNameAr?: string,
      insuredLastNameAr?: string,
      insuredEmail?: string,
      sequenceNo?: string,
      customNo?: string,
      referenceNo?: string,
      productTypeId?: number,
      endDate?: Date,
      startDate?: Date,
      policyStatusId?: number,
      channel?:number,
      merchantId?:string,
      pageIndex?:number,
      pageSize?:number,
      sortOrder?:boolean,
      isExcel?:boolean
    ) {
      this.insuredPhone = insuredPhone || '';
      this.insuranceCompanyId = insuranceCompanyId || null;
      this.invoiceNo = invoiceNo || null;
      this.nationalId = nationalId || '';
      this.insuredFirstNameAr = insuredFirstNameAr || '';
      this.insuredLastNameAr = insuredLastNameAr || '';
      this.insuredEmail = insuredEmail || '';
      this.sequenceNo = sequenceNo || '';
      this.customNo = customNo || '';
      this.referenceNo = referenceNo || '';
      this.productTypeId = productTypeId || null;
      this.endDate = endDate || null;
      this.startDate = startDate || null;
      this.policyStatusId = policyStatusId || null;
      this.channel = channel || null;
      this.merchantId=merchantId||null;

      this.pageIndex=pageIndex||null;
      this.pageSize=pageSize||null;
      this.sortOrder=sortOrder||null;
      this.isExcel=isExcel||null;

    }
}
