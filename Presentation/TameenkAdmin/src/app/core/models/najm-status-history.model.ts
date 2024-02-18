/** The Najm Status History Model */
export interface NajmStatusHistory {
  /** Najm Status ID */
  id: number;

  /** Najm Status Reference Id */
  referenceId: string;

  /**  Najm Status Policy Number */
  policyNo: string;

  /** Najm Status Status Code */
  statusCode: number;

  /** Najm Status Status Description */
  statusDescription: string;

  /** Najm Status uploaded Date */
  uploadedDate: Date;

  /** Najm Status Uploaded Reference */
  uploadedReference: string;
}
