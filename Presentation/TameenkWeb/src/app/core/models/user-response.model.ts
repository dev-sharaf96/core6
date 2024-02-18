export interface IUser {
  id: number;
  userId: string;
  createdDate: Date;
  lastModifiedDate: Date;
  lastLoginDate: Date;
  deviceToken: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  promotion: string;
}
