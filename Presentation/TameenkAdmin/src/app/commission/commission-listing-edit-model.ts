export class CommissionListingEditModel {
  Id :number
  CompanyKey :string
  CompanyId : number
  InsuranceTypeCode : number
  Key : string
  Percentage :number
  FixedFees :number
  CalculatedFromBasic : boolean
  IsCommission : boolean
  PaymentMethod : number
  CreatedDate : Date
  CreatedBy : string
  ModifiedDate :Date
  ModifiedBy : string
  IncludeAdditionalDriver : boolean
  IsPercentageNegative : boolean
  IsFixedFeesNegative : boolean
}
