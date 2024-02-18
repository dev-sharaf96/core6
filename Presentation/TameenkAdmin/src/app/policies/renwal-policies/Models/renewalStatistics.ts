export class renewalStatistics {
    companyId: number;
    companyKey: string;
    companyCount: number;
    renewalCompanyCount:number;
 
        constructor(
            companyId?: number,
            companyKey?: string,
            companyCount?: number,
            renewalCompanyCount?: number,
         
        ) {
          this.companyId = companyId || null;
          this.companyKey = companyKey || null;
          this.companyCount = companyCount || null;
          this.renewalCompanyCount = renewalCompanyCount || null;

        }
    }