export interface ProcessingQueueInfo {
  referenceId: string;
  triesNumber: number;
  errorDescription: string;
  companyName: string;
  InsuranceTypeCode?: any;
  nationalId: string;
  vehicleId: string;
  serviceRequest: string;
  serviceResponse: string;
  chanel: string;
  createdDate: Date;
}
