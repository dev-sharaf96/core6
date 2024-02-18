import { IPolicy } from './policy.model';
/** The Update Request Model */
export interface IUpdateRequest {
  /** Update Request ID */
  id: number;

  /** Update guid */
  guid: string;

  /** Policy ID */
  policyId: number;


  /**status ID */
  statusId: number;


  /** Request Type ID */
  requestTypeId: number;

  /** Update Request Attachments */
  attachments: any[];

  /** Update Request Policy */
  policy: IPolicy[];
}
