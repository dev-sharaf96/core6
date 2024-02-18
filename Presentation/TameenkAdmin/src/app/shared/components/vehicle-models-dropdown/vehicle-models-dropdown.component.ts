import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IIdNamePairModel, CommonResponse, VehicleService, LocalizationService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-models-dropdown',
  templateUrl: './vehicle-models-dropdown.component.html',
  styleUrls: ['./vehicle-models-dropdown.component.css']
})
export class VehicleModelsDropdownComponent implements OnInit, OnChanges {
  @Input() selectedValue;
  @Input() makerId = 1;
  @Output() selectedValueChange = new EventEmitter();
  models: IIdNamePairModel[];
  model = new IIdNamePairModel();

  constructor(
    private _vehicleService: VehicleService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.getVehicleMakerModels(this.makerId);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.makerId) {
      this.selectedValue = null;
      this.getVehicleMakerModels(this.makerId);
    }
  }
  getVehicleMakerModels(makerId) {
    this._vehicleService.getVehicleMakerModels(makerId).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.models = [];
      this.models = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.models.unshift({id: null, name: 'all'})
      : this.models.unshift({id: null, name: 'الكل'});
      this.model = this.models.find((model) => model.id === this.selectedValue);
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  changed() {
    this.selectedValue = this.model.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
