import { CheckOutDetails } from './checkOutDetails.model';
import { InsuranceCompany } from './InsuranceCompany.model';


// The Policy Model
export interface IPolicy {

  // Policy ID
  id: number;

  /**
   * Policy Insurance Company ID
   */
  insuranceCompany: InsuranceCompany;

  /** Policy Status Code */
  statusCode: number;


  /** insurance company name */
  companyName: string;


  /** Policy Najm Status */
  najmStatus: string;

  /** Policy Policy No */
  policyNo: string;

  /** Policy Policy Issue Date */
  policyIssueDate: Date;

  /** Policy Policy Effective Date */
  policyEffectiveDate: Date;

  /** Policy Policy Expiry Date */
  policyExpiryDate: Date;

  /**
   * Policy Checkout Details Id
   */
  checkoutDetail: CheckOutDetails;

  /** Policy Policy File Id */
  policyFileId: number;

  /** Policy User Email */
  userEmail: string;

  /**
   * Policy User Name
   */
  englishUserName: string;

  /**
   * Policy Company Name
   */
  englishCompanyName: string;

  /**
   * Policy is refunded
   */
  isRefunded: boolean;
  // Full name Ar
  insuredFullNameAr?: string;
  // Full name Ar
  insuredFullNameEn?: string;
  // insured full name
  insuredFullName?: string;
  // insured id
  insuredNIN?: string;
  // Vehicle plate number
  vehiclePlateNumber?: string;
}
