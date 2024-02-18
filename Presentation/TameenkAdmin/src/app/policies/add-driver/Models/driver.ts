export class Driver {
    nationalId: string;
    medicalConditionId: string;
    violationIds: string;
    licenseExpiryMonth: string;
    licenseExpiryYear: string;
    edcuationId: string;
    childrenBelow16Years: string;
    drivingPercentage: string;
    birthDateMonth: string;
    birthDateYear: string;
    driverExtraLicenses: string;
    DrivingPercentage: string;
    driverNOALast5Years: string ;
    driverWorkCityCode: string;
    driverWorkCity: string ;
    driverHomeCityCode: string ;
    driverHomeCity: string ;
    isCompanyMainDriver: string ;
    relationShipId: string ;
    mobileNo:string;

        constructor(
            nationalId?: string,
            medicalConditionId?: string,
            violationIds?: string,
            licenseExpiryMonth?: string,
            licenseExpiryYear?: string,
            edcuationId?: string, 
            childrenBelow16Years?: string, 
            drivingPercentage?: string,
            birthDateMonth?: string, 
            birthDateYear?: string, 
            driverNOALast5Years?: string, 
            driverWorkCityCode?: string, 
            driverExtraLicenses?:string,
            driverWorkCity?: string, 
            driverHomeCityCode?: string, 
            driverHomeCity?: string,
            isCompanyMainDriver?: string,
            relationShipId?: string, 
            mobileNo?:string

 
         
        ) {
          this.nationalId = nationalId || null;
          this.medicalConditionId = medicalConditionId || null;
          this.violationIds = violationIds || null;
          this.licenseExpiryMonth = licenseExpiryMonth || null;
          this.licenseExpiryYear = licenseExpiryYear || null;
          this.edcuationId = edcuationId || null;
          this.childrenBelow16Years = childrenBelow16Years || null;
          this.drivingPercentage = drivingPercentage || null;
          this.birthDateMonth = birthDateMonth || null;
          this.birthDateYear = birthDateYear || null;
          this.driverExtraLicenses = driverExtraLicenses || null;
          this.driverNOALast5Years = driverNOALast5Years || null;
          this.driverWorkCityCode = driverWorkCityCode || null;
          this.driverWorkCity = driverWorkCity || null;
          this.driverHomeCityCode = driverHomeCityCode || null;
          this.driverHomeCity = driverHomeCity || null;
          this.isCompanyMainDriver = isCompanyMainDriver || null;
          this.relationShipId = relationShipId || null;
          this.mobileNo = mobileNo || null;
        }
    }