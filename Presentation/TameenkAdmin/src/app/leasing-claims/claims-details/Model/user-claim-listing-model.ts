import { UserClaimHistoryModel } from "./user-claim-history-model";

export class UserClaimListingModel {
  id: number;
  referenceId: string;
  policyNo: string;
  externalId: string;
  driverLicenseExpiryDate: string;
  driverLicenseTypeCode: number;
  iban: string;
  claimStatusId: number;
  claimStatusName: string;
  createdDate: string;
  history: UserClaimHistoryModel[];
}
