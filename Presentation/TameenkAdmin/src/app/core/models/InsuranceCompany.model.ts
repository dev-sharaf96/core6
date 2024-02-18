import { Address } from './Address.model';
import { Contact } from './contact.model';
/**
 * The InsuranceCompany Model
 */
export class InsuranceCompany {

  constructor(address: Address, contact: Contact
  ) {
    this.address = address;
    this.contact = contact;
  }

  // dll file
  fileToUpload: any;
  // id insurance Comapny
  id: number;
  // name in arabic
  nameEN: string;
  // name in english
  nameAR: string;
  // description in arabic
  descAR: string;
  // description in english
  descEN: string;


  // namespaceTypeName
  namespaceTypeName: string;

  // ClassTypeName
  classTypeName: string;

  // ReportTemplateName
  reportTemplateName: string;

  // created Data
  createdDate: string;

  // created by Guid
  createdBy: string;

  // modified by Guid
  modifiedBy: string;

  // last modifiy
  lastModifiedDate: string;

  isActiveTPL:boolean;
  isActiveComprehensive:boolean;

  // address
  address: Address;

  // contact object
  contact: Contact;

  // this company active or not
  isActive: boolean;
  hasDiscount: boolean;
  discountText: boolean;
  discountStartDate: Date;
  discountEndDate: Date;
  isAddressValidationEnabled:boolean;

  usePhoneCamera: boolean;
  policyFailureRecipient: string;
  isUseNumberOfAccident: boolean;
  najmNcdFreeYearsToUseNumberOfAccident: string;
  allowAnonymousRequest: boolean;
  showQuotationToUser: boolean;
  vAT: string;
  termsAndConditionsFile: any;
  validateSaudiPostAddressInQuotation: boolean;
  order: number;

  activeTabbyTPL:boolean;
  activeTabbyComp:boolean;
  isActiveSanadPlus:boolean;
  isActiveWafiSmart:boolean;
}
