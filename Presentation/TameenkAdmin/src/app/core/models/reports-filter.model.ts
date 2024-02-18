export interface IReportsFilter {
    // Product type id
    productTypeId?: number;
    // Policy number
    policyNumber: string;
    // Age from
    byAgeFrom?: number;
    // Age to
    byAgeTo?: number;
    // City Id
    cityId?: number;
    // Vehicle maker id
    vehicleMakerId?: number;
    // Vehicle maker's model id
    vehicleMakerModelId?: number;
    // Year
    year?: number;
    // Vehicle Body type Id
    bodyTypeId?: number;
    // Issuance Date from
    issuanceDateFrom?: Date;
    // Issuance date to
    issuanceDateTo?: Date;
}
