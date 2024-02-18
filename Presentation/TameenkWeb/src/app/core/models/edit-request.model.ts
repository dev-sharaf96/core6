import { IPolicyUpdateFileDetail } from '.';
export interface IEditRequest {
  policyId: number;
  policyUpdateFileDetails: IPolicyUpdateFileDetail[];
  editRequestType: number;
}
