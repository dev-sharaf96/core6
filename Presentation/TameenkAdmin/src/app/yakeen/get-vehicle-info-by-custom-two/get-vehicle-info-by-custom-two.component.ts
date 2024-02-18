import { Component, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/requests/requests.model';
import { LocalizationService, CommonResponse } from '../../core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehicleInfoByCustomTwoSearchModel } from './models/vehicle-info-by-custom-two-search-model';
import { YakeenServicesService } from 'src/app/core/services/yakeen-services.service';
import { SeqNoFormControl } from 'src/app/ticket/create-ticket/form-controll/seq-no-form-control';

@Component({
  selector: 'app-get-vehicle-info-by-custom-two',
  templateUrl: './get-vehicle-info-by-custom-two.component.html',
  styleUrls: ['./get-vehicle-info-by-custom-two.component.css']
})
export class GetVehicleInfoByCustomTwoComponent implements OnInit {
  searchModel: VehicleInfoByCustomTwoSearchModel = new VehicleInfoByCustomTwoSearchModel();
  gridData: RequestModel[] = [];
  selectedRequest: RequestModel;
  dataForm: FormGroup = new FormGroup({});
  isEnglish: boolean;
  firstTime: boolean;
  loading: boolean;
  shoeDetails: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  years: any[] = [];
  requiredCustomCardNumber:any;
  currentYear: number = new Date().getFullYear();
  
  constructor(private _localizationService: LocalizationService,
              private _toastrService: ToastrService,
              private _yakeenServicesService: YakeenServicesService) { }

  ngOnInit() {
    this.loading = false;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.generateYears(1900, this.currentYear + 1);
    this.initForm();
  }

  generateYears(min, max) {
    this.years = [];
    for (let i = max; i >= min; i--) {
      this.years.push({ key: i, value: i });
    }
  }

  initForm() {
    this.dataForm = new FormGroup({
      customCardNumber: new SeqNoFormControl('', [Validators.required, Validators.minLength(10)]),
      modelYear: new FormControl(this.years[0], Validators.required)
    });
  }

  Search() {
    this.loading = true;
    if (!this.dataForm.valid) {
      this.loading = false;
      return;
    }

    this.searchModel.CustomCrdNumber = this.dataForm.value.customCardNumber;
    this.searchModel.ModelYear = this.dataForm.value.modelYear.key;
    this._yakeenServicesService.checkUpdateCarInfoByCustomTwo(this.searchModel).subscribe(data => {
      if (data.data) {
        this.gridData = [];
        this.gridData.push(data.data.Result);
        this._toastrService.success(data.data.errorDescription);
      }

      this.loading = false;
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
          this.loading = false;
        });
      }
    });
  }

  showDetails(request: RequestModel) {
    this.selectedRequest = request;
  }
}