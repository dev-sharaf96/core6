import { Injectable } from '@angular/core';
import { InitInquiryResponseModel, IInquiryValidation, YakeenMissingFieldBase } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InquiryWorkflowService {
  private workflow = ['main', 'insured', 'vehicle'];
  firstStep = 'main';
  currentStep = 'main';
  lastStep = this.workflow[this.workflow.length - 1];

  inquiry: InitInquiryResponseModel = new InitInquiryResponseModel();
  validationErrors: IInquiryValidation = new IInquiryValidation();

  yakeenMissingFields: YakeenMissingFieldBase<any>[];
  quotationRequestExternalId: string;
  constructor() { }

  getNextStep(): string {
      if(this.currentStep !== this.lastStep) {
          return this.currentStep = this.workflow[this.workflow.indexOf(this.currentStep) + 1];
      }
  }
  getPrevStep(): string {
      if(this.currentStep !== this.firstStep) {
          return this.currentStep = this.workflow[this.workflow.indexOf(this.currentStep) - 1];
      }
  }
  removeStep(step) {
      this.workflow.splice(this.workflow.indexOf(step), 1);
      this.lastStep = this.workflow[this.workflow.length - 1];
  }
  refreshSteps() {
      this.workflow = ['main', 'insured', 'vehicle'];
      this.lastStep = this.workflow[this.workflow.length - 1];
  }


  parseArabic(str) {
    if(str) {
      str = str.toString();
      return Number( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => {
          return d.charCodeAt(0) - 1632; // Convert Arabic numbers
      }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g,(d) => {
          return d.charCodeAt(0) - 1776; // Convert Persian numbers
      }) );
    }
    return str;
  }
}
