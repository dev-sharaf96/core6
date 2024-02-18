import { INotificationParameter } from '.';
/** The Notification Model */
export interface Notification {
  /** Notification ID */
  id: number;

  /** Notification Group */
  group: string;

  /** Notification Group Reference Id */
  groupReferenceId: number;

  /** Notification Type */
  type: string;

  /** Notification Parameters of type <INotificationParameter[]> */
  parameters: INotificationParameter[];

  /** Notification Created At */
  createdAt: string;

  /** Notification Status */
  status:	string;
}
