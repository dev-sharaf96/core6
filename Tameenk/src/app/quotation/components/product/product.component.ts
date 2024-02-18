import { IProduct } from './../../../core/models/product.model';
import { LocalizationService, InsuranceTypes } from "../../../core";

    @Input() productTemp: IProduct;
    @Input() productsToRender: IProduct[];
    @Input() hiddenId: any;
    @Input() deductableValueList: any[];
    deductableValues: any[];
    @Input() medGulfDeductableValue;
    @Input() isMedGulfDeductableValueChenged;
    @Input() ArabianShieldDeductableValue;
    @Input() isArabianShieldDeductableValueChenged;
    @Input() ACIGDeductableValue;
    @Input() isACIGDeductableValueChenged;
    @Input() AlRajhiDeductableValue;
    @Input() isAlRajhiDeductableValueChenged;
  pathImg: string;
    deductableValue: number;
    productId: string;
    priceDetails: any[];
    productBenefits: any[];
    @Input() isDone;
termsFilePath: string;
  // companiesMapList = {
  //   // 1: 'WF',
  //   // 2: 'ACIG',
  //   // 3: 'SD',
  //   // 4: 'AC',
  //   // 5: 'TU',
  //   // 6: 'SG',
  //   // 7: 'WL',
  //   // 8: 'MG',
  //   // 9: 'D3',
  //   // 10: 'AH',
  //   // 11: 'GG',
  //   // 12: 'TW',
  //   // 13: 'UC', // fake
  //   // 32: 'AM', // fake
  //   // 33: 'ML', // fake
  //   // 34: 'WT'
  //   // 6: 'RS',
  //   // 6: 'RT',
  //   // 6: 'SC',
  //   // 6: 'SL'

  //   // 1: 'WF',
  //   // 2: 'ACIG',
  //   // 3: 'SD',
  //   // 4: 'AC',
  //   // 5: 'TU',
  //   // 6: 'SG',
  //   // 7: 'WL',
  //   // 8: 'MG',
  //   // 9: 'D3',
  //   // 10: 'AH',
  //   // 11: 'Gulf General',
  //   // 12: 'Tawuniya',
  //   // 13: 'Salama',
  //   // 32: 'companyloza',
  //   // 33: 'company'
  //   1: 'AG',
  //   2: 'SD',
  //   3: 'TW',
  //   4: 'AC',
  //   5: 'D3',
  //   6: 'WF',
  //   7: 'WL',
  //   9: 'AH',
  //   10: 'SG',
  //   11: 'GU',
  //   12: 'TU',
  //   13: 'GG',
  //   15: 'AM',
  //   16: 'RS',
  //   17: 'ML',
  //   18: 'MG',
  //   19: 'SL',
  //   20: 'AX',
  //   21: 'AL',
  //   22: 'SC',
  //   23: 'AR',
  //   24: 'TM',
  //   25: 'BR',
  //   26: 'UC',
  //   27: 'MT',
  //   28: 'EN',
  //   29: 'BP',
  //   30: 'WT'
  // };
  constructor(private _localizationService: LocalizationService, private el: ElementRef) 
  {
    
      if (this.IsAgency) {
          this.pathImg = "../../../../../resources/imgs/benfitsicons/AGENCYRepairs1500.png";
      } else {
          this.pathImg = "../../../../../resources/imgs/benfitsicons/WORKSHOPRepairs750.png";
      }
      //if (this.product.deductableValue==1000 ) {
      //    this.DeductibleImgPath = "../../../../../resources/imgs/benfitsicons/deductableValue1000.png";
      //}
      //else if (this.product.deductableValue == 2000)
      //{
      //    this.DeductibleImgPath = "../../../../../resources/imgs/benfitsicons/deductableValue2000.png";
      //}
  }
  ngOnInit() {
        this.deductableValues = this.deductableValueList.filter(x => x.providerId == this.product.providerId);
this.loginUrl = "/Account/Login?returnUrl=" +window.location.pathname+window.location.search;
  this.priceDetails = JSON.parse(JSON.stringify(this.product.priceDetails));
        this.productBenefits = JSON.parse(JSON.stringify(this.product.productBenefits));
        this.deductableValue = this.product.deductableValue;
        this.productId = this.product.id;

    if (this.product.termsFilePathEn) {
        this.termsFilePath = this.product.termsFilePathEn;
    }
    else if (this.product.termsFilePathAr)
    {
        this.termsFilePath = this.product.termsFilePathAr;
    }
  }
  ngOnChanges() {
    this.isAddedToCompare = this.comparProducts.some(el => {
      return el.id === this.product.id;
    });
   this.deductableValue = this.product.deductableValue;
  }
  benfitChange(benefit) {
        if (benefit.benefitId == 8  && (this.product.providerId == 22||this.product.providerId == 26)) { // Malath company && Amana
            var isSelected = this.product.productBenefits.find(b => b.benefitId == 8).isSelected;
            if (isSelected == true) {
                this.product.productBenefits.filter(b => b.benefitId == 1).forEach(benefit => {
                    benefit.isSelected = true;
                    benefit.isReadOnly = true;
                });
            }
            else {
                this.product.productBenefits.filter(b => b.benefitId == 1).forEach(benefit => {
                    benefit.isReadOnly = false;
                });
            }

            this.benfitChange(this.calcbenefits(this.product.productBenefits));
            return;
        }
        this.productPrice = this.product.productPrice + benefit.benefitsValue;
        const vat = this.product.priceDetails.find(c => c.priceTypeCode === 8) || { priceValue: 0 };
        vat.priceValue = this.vatValue + benefit.benefitsVat;
    }
     //   console.log("this.hiddenId ", this.hiddenId);
     //   console.log(" before this.product.id ", $('#' + this.hiddenId).val());
        let providerId = this.product.providerId;
        let productId = event.target.value;
        let index = this.productsToRender.findIndex(x => x.id == this.product.id);

        this.product.priceDetails = JSON.parse(JSON.stringify(this.priceDetails));
        this.product.productBenefits = JSON.parse(JSON.stringify(this.productBenefits));

        this.product = this.products.find(x => x.id == productId && x.providerId == providerId);
      //  console.log(this.IsAgency);
       // console.log('this.product.productBenefits ',this.product.productBenefits);
        if (this.IsAgency == true) {
            this.benfitChange(this.calcbenefits(this.product.productBenefits));
        }

        $('#' + this.hiddenId).val(this.product.id);
        this.emitChangeDeductableValue.emit({ product: this.product, index: index });
    }


    productIdWithPrice(index: number, price: any): string {
        return price.detailId + '_' + price.productID;
    }

    calcbenefits(benefits) {
        let benefitsValue = 0;
        let benefitsVat = 0;
        benefits.filter(b => b.isSelected).forEach(benefit => {
            benefitsValue += benefit.benefitPrice * 1.15;
            benefitsVat += benefit.benefitPrice * 0.15;//benefitsValue - benefit.benefitPrice;
        });
        return ({ benefitsValue: benefitsValue, benefitsVat: benefitsVat });
    }
        var selectedBenfits = this.product.productBenefits.forEach(a => {
            a.isSelected = false;
        });
        
        this.isMedGulfDeductableValueChenged = true;
        this.emitChangeMedGulfDeductableValue.emit({ product: this.product, deductablevalue: event.target.value });
    }
        var selectedBenfits = this.product.productBenefits.forEach(a => {
            a.isSelected = false;
        });
        
        this.isArabianShieldDeductableValueChenged = true;
        this.emitChangeArabianShieldDeductableValue.emit({ product: this.product, deductablevalue: event.target.value });
    }
        var selectedBenfits = this.product.productBenefits.forEach(a => {
            a.isSelected = false;
        });
        
        this.isACIGDeductableValueChenged = true;
        this.emitChangeACIGDeductableValue.emit({ product: this.product, deductablevalue: event.target.value });
    }
        var selectedBenfits = this.product.productBenefits.forEach(a => {
            a.isSelected = false;
        });
        
        this.isAlRajhiDeductableValueChenged = true;
        this.emitChangeAlRajhiDeductableValue.emit({ product: this.product, deductablevalue: event.target.value });
    }
        //this.downloadCompanyPolicyTermsAndConditions.emit(
        //    {
        //        providerId: this.product.providerId,
        //        insuranceType: this.product.insuranceTypeCode,
        //        filePath: null,
        //        isEnglish: this.isEnglish
        //    }
        //);

        window.open(this.termsFilePath, "_blank");
    }
}