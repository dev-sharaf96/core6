export class CorporateUserFilter {
  email: string;
  mobile: string;
  accountId: number;
    constructor(
      email?: string,
      mobile?: string,
      accountId?: number
    ) {
      this.email = email || '';
      this.mobile = mobile || '';
      this.accountId = accountId || null;
    }
}
