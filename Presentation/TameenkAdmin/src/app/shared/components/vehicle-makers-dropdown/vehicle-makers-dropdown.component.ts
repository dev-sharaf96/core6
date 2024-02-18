import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdNamePairModel, VehicleService, CommonResponse, LocalizationService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-makers-dropdown',
  templateUrl: './vehicle-makers-dropdown.component.html',
  styleUrls: ['./vehicle-makers-dropdown.component.css']
})
export class VehicleMakersDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  makers: IIdNamePairModel[];
  maker = new IIdNamePairModel();

  constructor(
    private _vehicleService: VehicleService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

    ngOnInit() {
      this._vehicleService.getVehicleMakers().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.makers = [];
      this.makers = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.makers.unshift({id: null, name: 'all'})
      : this.makers.unshift({id: null, name: 'الكل'});
      this.maker = this.makers.find((maker) => maker.id === this.selectedValue);
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
    this.selectedValue = this.maker.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
