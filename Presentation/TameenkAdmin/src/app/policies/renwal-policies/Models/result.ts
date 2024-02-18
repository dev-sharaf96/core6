import { renewalData } from './renewalData';
import { renewalStatistics } from './renewalStatistics';

export class result{
    renewalStatistics: renewalStatistics[];
    renewalData : renewalData[];
    renewalDataCount: number;
    totalPoliciesCount: number;
    exportBase64String:string

        constructor(
            renewalStatistics?: renewalStatistics[],
            renewalData ?: renewalData[],
            renewalDataCount?: number,
            totalPoliciesCount?: number,
            exportBase64String?: string,


        ) {
          this.renewalStatistics = renewalStatistics || null;
          this.renewalData  = renewalData  || null;
          this.renewalDataCount = renewalDataCount || null;
          this.totalPoliciesCount = totalPoliciesCount || null;
          this.exportBase64String = exportBase64String || null;
        }
    }
