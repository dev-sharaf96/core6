export class najmPolicyFilter {
    policyNo:  string;
    referenceNo: string;
    startDate: Date;
    endDate: Date;
    companyId:number;	
    exports:boolean;
        constructor(
            policyNo?: string,
            referenceNo?: string,
            startDate?: Date,
            endDate?: Date,
            companyId?:number,	
            exports?:boolean
        ) {
            this.policyNo = policyNo || null;
            this.referenceNo = referenceNo || null;
            this.startDate = startDate || null;
            this.endDate = endDate || null;
            this.companyId = companyId || null;
            this.exports = this.exports || null;
        }
    }



