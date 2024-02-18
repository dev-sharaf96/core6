export class ApprovalListingModel {
  id: number;
  nin: string;
  email: string;
  enrolledType: string;
  file: string;
  emailVerified: boolean;
  ninVerified: boolean;
  isDeleted: boolean;

  // for actions buttons
  approved: boolean;
  type;
}
