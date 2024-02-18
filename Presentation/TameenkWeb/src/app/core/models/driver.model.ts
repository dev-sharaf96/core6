export class Driver {
  nationalId: string;
  medicalConditionId: number;
  violationIds: number[];
  licenseExpiryMonth: number;
  licenseExpiryYear: number;
  edcuationId: number;
  childrenBelow16Years: number;
  drivingPercentage: number;
  birthDateMonth: number;
  birthDateYear: number;
  driverExtraLicenses: DriverExtraLicense[];
  isEdit: boolean; // for UI
  isFormValid: boolean; // for UI
  hasExtraLicenses: boolean; // for UI
  constructor() {
    (this.medicalConditionId = 1),
      (this.violationIds = []),
      (this.edcuationId = 4),
      (this.childrenBelow16Years = 0),
      (this.drivingPercentage = 0),
      (this.isEdit = false); // for UI
    this.isFormValid = true; // for UI
    this.hasExtraLicenses = false; // for UI
  }
}

export class DriverExtraLicense {
  countryId: number;
  licenseYearsId: number;
  constructor() {}
}
