export interface INotification {
  policyUpdateRequestGuid: string;
  policyId: string;
  policyFileId: string;
  id: number;
  group: string;
  groupReferenceId: string;
  typeId: number;
  typeName: string;
  type: number;
  parameters: IParameter[];
  createdAt: Date;
  status: string;
}

interface IParameter {
  id: number;
  name: string;
  value: string;
}
