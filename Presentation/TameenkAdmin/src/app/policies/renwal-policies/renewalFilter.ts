
export class renewalFilter {
    insuranceCompanyId: string;
    insuranceTypeCode: string;
    expirationDateFrom: Date;
    expirationDateTo: Date;
    lang: string;
    export:boolean
        constructor(
            insuranceCompanyId?: string,
            insuranceTypeCode?: string,
            expirationDateFrom?: Date,
            expirationDateTo?: Date,
            lang?: string,
            _export?: boolean

        ) {
          this.insuranceCompanyId = insuranceCompanyId || null;
          this.insuranceTypeCode = insuranceTypeCode || null;
          this.expirationDateFrom = expirationDateFrom || null;
          this.expirationDateTo = expirationDateTo || null;
          this.lang = lang || null;
          this.export = _export || null;


        }
    }
