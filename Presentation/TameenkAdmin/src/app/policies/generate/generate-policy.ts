export class GeneratePolicy {
  referenceId: string;
  statusCode: number;
  errors: IReqError[];
  policyNo: string;
  policyIssuanceDate: Date;
  policyEffectiveDate: Date;
  policyExpiryDate: Date;
  policyFileUrl: string;
  companyID: number;
  channel: string;
  policyFile: string;
  isPolicyGeneratedByBCare: boolean;
  constructor() {
    this.referenceId = null;
    this.statusCode = null;
    this.errors = null;
    this.policyNo = null;
    this.policyIssuanceDate = null;
    this.policyEffectiveDate = null;
    this.policyExpiryDate = null;
    this.policyFileUrl = null;
    this.companyID = null;
    this.channel = null;
    this.policyFile = null;
    this.isPolicyGeneratedByBCare = false;
  }
}

export class GeneratePolicyRes {
  ErrorDescription: string;
  ErrorCode: number;
}
interface IReqError {
  code: string;
  message: string;
  field: string;
}
