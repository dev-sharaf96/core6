
 export class ClaimsResponseModel {
        id: number;
        referenceId: string;
        policyNo: string;
        externalId: string;
        driverLicenseExpiryDate: string;
        driverLicenseTypeCode?: number;
        iban: string;
        claimStatusId: number;
        claimStatusName: string;
        createdDate: string;
        accidentReportNumber: string;
        accidentReport: string;
       
          constructor(
            id?: number,
            referenceId?: string,
            policyNo?: string,
            externalId?: string,
            driverLicenseExpiryDate?: string,
            driverLicenseTypeCode?: number,
            iban?: string,
            claimStatusId?: number,
            claimStatusName?: string,
            createdDate?: string,
            accidentReportNumber?: string,
            accidentReport?: string
          ) {
            this.id = id || null;
            this.referenceId = referenceId || null;
            this.policyNo = policyNo || null;
            this.externalId = externalId || null;
            this.driverLicenseExpiryDate = driverLicenseExpiryDate || null;
            this.driverLicenseTypeCode =  driverLicenseTypeCode || null;
            this.iban = iban || null;
            this.claimStatusId = claimStatusId || null;
            this.claimStatusName = claimStatusName || null;
            this.createdDate = createdDate || null;
            this.accidentReportNumber = accidentReportNumber || null;
            this.accidentReport = accidentReport || null;
          }
      }