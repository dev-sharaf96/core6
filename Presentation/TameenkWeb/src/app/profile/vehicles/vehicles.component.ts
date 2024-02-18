import { Component, OnInit } from '@angular/core';
import { InquiryService, CommonResponse, Vehicle, AuthService } from 'src/app/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[];
  totalCount: number;
  loading = false;
  constructor(
    private _inquiryService: InquiryService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getVehicles();
  }

  closePopup() {
    $('.popup-close').click();
  }
  getVehicles(paging?) {
    this.loading = true;
    this._inquiryService.getUserVehicles(this._authService.getUserId(), paging).subscribe((data: CommonResponse<Vehicle[]>) => {
    this.loading = false;
      this.vehicles = data.data;
      this.totalCount = data.totalCount;
    },
    (error) => error);
  }
  confirmDelete(e) {
    this._inquiryService.deleteUserVehicle(e).subscribe((data: CommonResponse<boolean>) => {
      $('.popup-close').click();
      this.getVehicles();
    },
    (error) => {
      $('.popup-close').click();
      return error;
    });
  }
}
