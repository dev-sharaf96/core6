export class AutoleaseUserFilter {
  email: string;
  mobile: string;
    constructor(
      email?: string,
      mobile?: string
    ) {
      this.email = email || '';
      this.mobile = mobile || '';
    }
}
