export class ServiceRequestPerCompanyFilter {
    // StatusCode: number;
    // StartDate: Date;
    // EndDate: Date;
    constructor(
      public StatusCode: number | null = null,
      public StartDate?: string,
      public EndDate?: string,
      public InsuranceTypeId?: string,
      public ModuleId?: string,

  
    ) {
      // this.StatusCode = StatusCode || null;
      // this.StartDate = StartDate || null;
      // this.EndDate = EndDate || null;
    }
  }
  