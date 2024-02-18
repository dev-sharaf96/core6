export class StopSMSFilterModel {
  phoneNo: string;

constructor(
  phoneNo?: string,

) {
  this.phoneNo = phoneNo || null;
 
}
}