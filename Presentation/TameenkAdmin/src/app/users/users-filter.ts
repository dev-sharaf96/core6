export class UsersFilter {
  email: string;
  userId: string;
  mobile: string;
  sadadNo: string;
    constructor(
      email?: string,
      userId?: string,
      mobile?: string,
      sadadNo?: string
    ) {
      this.email = email || '';
      this.userId = userId || '';
      this.mobile = mobile || '';
      this.sadadNo = sadadNo || '';
    }
}
