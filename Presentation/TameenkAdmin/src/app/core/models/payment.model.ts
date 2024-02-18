/** The Payment model */
export class Payment {
  /** Payment ID */
  id: number;

  /** Policy Update Request ID */
  policyUpdateRequestId: number;

  /** Payment Amount */
  amount: number;

  /** Payment Description */
  description: string;

  /** Payment Created By */
  createdBy: string;

  /** Payment Created At */
  createdAt: Date;
}
