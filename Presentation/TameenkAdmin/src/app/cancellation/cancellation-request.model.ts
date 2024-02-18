import { Type } from "@angular/core";

export class CancelRequest{
    referenceId:string;
    policyNo:string;
    accidentReportNumber:string;
    insuredId:string;
    insuredMobileNumber:string;
    insuredIBAN:string;
    insuredBankCode:number;
    driverLicenseExpiryDate:string;
    driverLicenseTypeCode:number;
    accidentReport:[];
    vehicleId:string;
    companyId:number;
    companyClassTypeName:string;
    companyNamespaceTypeName:string;
    companyName:string;
    isCancelled:boolean
}