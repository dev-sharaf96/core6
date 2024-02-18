import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IIdNamePairModel, AddressService, CommonResponse } from '../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-city-dropdown',
  templateUrl: './city-dropdown.component.html',
  styleUrls: ['./city-dropdown.component.css']
})
export class CityDropdownComponent implements OnInit {
  cities: IIdNamePairModel[];
  @Input() city: number;
  @Output() cityChange = new EventEmitter();

  constructor(private _addressService: AddressService, private _toastrService: ToastrService) { }

  ngOnInit() {
    // this.cities = [{ id: 1, name: "gizah" }, { id: 2, name: "cairo" }, { id: 3, name: "egypt" }, { id: 4, name: "sohag" }]
    this._addressService.getAllCitiyIdNamePair().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.cities = [];
      this.cities = data.data;
    },
      (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
  }

  citySelected(value: IIdNamePairModel) {
    this.cityChange.emit(this.city);
  }

}
