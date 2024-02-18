import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InsuranceCompany, LocalizationService} from '../../core';

@Component({
  selector: 'app-form-edit-add-company',
  templateUrl: './form-edit-add.component.html',
  styleUrls: ['./form-edit-add.component.css']
})
export class FormEditAddComponent implements OnInit {

  @Input() @Output() insuranceCompany: InsuranceCompany;
  @Output() onSubmit = new EventEmitter<InsuranceCompany>();

  constructor(private _localizationService: LocalizationService) { }

  nameENPattern: any = '^[^\u0621-\u064A]*$';
  nameArPattern: any = '^[^a-zA-Z]*$';
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobileNumberPattern: any = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  numberPattern = '^[0-9 +]*$';
  @Input() InEdit = false;
  @Input() ordersList = [];


  @Input() error: boolean;
  @Input() errorMessage: string;
  fileToUpload: File = null;
  showTermsFileValidation = false;
  termsFileValidationTextToAdd: string;
  isEn: boolean;

  ngOnInit() {
    this.isEn = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  handleFileInput(e, files) {
    this.fileToUpload = files[0];
  }


  handletermsAndConditionsFilePathFileInput(e, files) {
    if (files[0] != null) {
      const ext = files[0].name.split('.').pop();
      if (ext === 'pdf') {
        this.showTermsFileValidation = false;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
         if (fileReader.DONE) {
            this.insuranceCompany.termsAndConditionsFile = btoa(fileReader.result.toString());
          }
        };
      } else {
        this.showTermsFileValidation = true;
        this.termsFileValidationTextToAdd = (this.isEn) ? 'Please Upload pdf file only'
                                                                 : 'فقط pdf من فضلك حمل ملف بصيغة';
      }
    }
  }

  changeCompanyOrder(event) {
    console.log('changeCompanyOrder --> order');
    console.log(event);
    this.insuranceCompany.order = event.target.value;
  }

  OnSubmit() {

    if (this.fileToUpload != null) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(this.fileToUpload);
      fileReader.onload = () => {
        if (fileReader.DONE) {
          this.insuranceCompany.fileToUpload = btoa(fileReader.result.toString());
          this.onSubmit.emit();
        }
      };
    } else {
      this.onSubmit.emit();
    }
  }

}



