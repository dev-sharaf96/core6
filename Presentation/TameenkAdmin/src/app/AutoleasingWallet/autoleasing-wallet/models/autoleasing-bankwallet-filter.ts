export class AutoleasingBankWalletFilter {
  bankName: string;
    constructor(
      bankName?: string,
    ) {
      this.bankName = bankName || null;
    }
}
