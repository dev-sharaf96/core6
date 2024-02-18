export class PromotionProgramDomain {

    PromotionProgramId : number;
    Domian : string;
    DomainNameAr:string;
    DomainNameEn : string;
    Id: number;
    InsuranceCompany : InsuranceCompany;
    PromotionProgram: PromotionProgram;
    IsActive:boolean;
}

class InsuranceCompany{

    nameAR: string ;
    nameEN: string;
}
class PromotionProgram{
    Name :string;
}