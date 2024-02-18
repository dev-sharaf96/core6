export class addBenfitModel {
    benefitStartDate: string;
    referenceId: string;
    insuredId: string;
    policyNo:  string;
        constructor(
            benefitStartDate?: string,
            referenceId?: string,
            insuredId?: string,
            policyNo?: string,
        ) {
          this.benefitStartDate = benefitStartDate || null;
          this.referenceId = referenceId || null;
          this.insuredId = insuredId || null;
          this.policyNo = policyNo || null;

        }
    }