export class AutoleaseUserModel {
  CreatedBy: string;
  users: AutoleaseUser[];
}

export class AutoleaseUser {
  fullName: string;
  email: string;
  mobile: string;
  password?: any;
  bankId?: number;
  isSuperAdmin: boolean;
}
