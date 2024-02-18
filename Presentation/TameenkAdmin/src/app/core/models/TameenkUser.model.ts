export class TameenkUser {
  FullName: string;
  Email: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  RoleId: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  Roles: any[];
  Claims: any[];
  PromotionCodeCount: number;
  PoliciesCount: number;
  Id: string;
}
