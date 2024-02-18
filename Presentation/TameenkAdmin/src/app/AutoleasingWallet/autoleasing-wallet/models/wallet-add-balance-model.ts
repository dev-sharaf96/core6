export class WalletAddBalanceModel {
  bankId: number;
  balance: number;
  transactionTypeId:number;


constructor(
  bankId?: number,
  balance?: number,
  transactionTypeId?:number
) {
  this.bankId = bankId || null;
  this.balance = balance || 0;
  this.transactionTypeId=transactionTypeId||null;
}
}