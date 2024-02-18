import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policyUpdateRequestStatus'
})
export class PolicyUpdateRequestStatusPipe implements PipeTransform {
  transform(value: number): string {
    const statusArr = [
      'Pending',
      'Approved',
      'Rejected',
      'AwaitingPayment',
      'PaidAwaitingApproval'
    ];
    return statusArr[value];
  }
}
