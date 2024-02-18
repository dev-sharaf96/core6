export class User {
  Name: string;
  ChangePasswordAfterLogin: boolean;
  IsAdmin: boolean;
  IsActivated: boolean;
  CompanyId?: number;
  Password?: any;
  ConfirmPassword?: any;
  PageIds: number[];
  Email: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  SecurityStamp: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEndDate?: any;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
  Roles: any[];
  Claims: any[];
  Logins: any[];
  Id: number;
  UserName: string;
}
