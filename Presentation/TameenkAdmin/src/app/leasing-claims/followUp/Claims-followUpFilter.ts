export class ClaimsFollowUpFilterModel {
  Id: number;
  referenceId: string;
  policyNo: string;
  nationalId: string;
  statusId: number;
  requesterTypeId: number;
  accidentReportNumber: string;
  iban: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  pageSize: number;
  export: boolean;
  // notes: string;

      constructor(
        Id?: number,
        referenceId?: string,
        policyNo?: string,
        nationalId?: string,
        statusId?: number,
        requesterTypeId?: number,
        accidentReportNumber?: string,
        iban?: string,
        startDate?: string,
        endDate?: string,
        pageNumber?: number,
        pageSize?: number,
        isexport?: boolean,
        // notes?: string
      ) {
        this.Id = Id || null;
        this.referenceId = referenceId || null;
        this.policyNo = policyNo || null;
        this.nationalId = nationalId || null;
        this.statusId = statusId || null;
        this.requesterTypeId = requesterTypeId || null;
        this.accidentReportNumber = accidentReportNumber || null;
        this.iban = iban || null;
        this.startDate = startDate || null;
        this.endDate = endDate || null;
        this.pageNumber = pageNumber || null;
        this.pageSize = pageSize || null;
        this.export = isexport || null;
        // this.notes = notes || null;
      
      }
  }
