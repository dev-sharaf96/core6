import { IPolicyUpdateFileDetail } from './policy-update-file-detail.model';
export interface IEditRequest {
  policyId: number;
  policyUpdateFileDetails: IPolicyUpdateFileDetail[];
  editRequestType: number;
}
