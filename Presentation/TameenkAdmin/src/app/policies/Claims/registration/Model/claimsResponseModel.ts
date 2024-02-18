
 export class claimsResponseModel {
        referenceId: string;
        policyNo: string;
        accidentReportNumber: string;
        insuredId: string;
        insuredMobileNumber: string;
        insuredIBAN: string;
        insuredBankCode: string;
        driverLicenseExpiryDate: string;
        driverLicenseTypeCode?: number;
         accidentReport: string;
        vehicleId: string;
        companyId: string;
        companyClassTypeName: string;
        companyNamespaceTypeName: string;
       
          constructor(
            referenceId?: string,
            policyNo?: string,
            accidentReportNumber?: string,
            insuredId?: string,
            insuredMobileNumber?: string,
            insuredIBAN?: string,
            insuredBankCode?: string,
            driverLicenseExpiryDate?: string,
            driverLicenseTypeCode?: number,
            accidentReport?: string,
            vehicleId?: string,
            companyId?: string,
            companyClassTypeName?: string,
            companyNamespaceTypeName?: string,
           
          ) {
            this.referenceId = referenceId || null;
            this.policyNo = policyNo || null;
            this.accidentReportNumber = accidentReportNumber || null;
            this.insuredId = insuredId || null;
            this.insuredMobileNumber = insuredMobileNumber || null;
            this.insuredIBAN = insuredIBAN || null;
            this.insuredBankCode = insuredBankCode || null;
            this.driverLicenseExpiryDate = driverLicenseExpiryDate || null;
            this.driverLicenseTypeCode = driverLicenseTypeCode || null;
            this.accidentReport = accidentReport || null;
            this.vehicleId = vehicleId || null;
            this.companyId = companyId || null;
            this.companyClassTypeName = companyClassTypeName || null;
            this.companyNamespaceTypeName = companyNamespaceTypeName || null;
        
          }
      }