import { Component, OnInit } from '@angular/core';
import { YakeenCityCenter } from './yakeen-city-center';
import { ToastrService } from 'ngx-toastr';
import { YakeenCityCenterService } from '../core/services/yakeen-city-center.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yakeen-city-center',
  templateUrl: './yakeen-city-center.component.html',
  styleUrls: ['./yakeen-city-center.component.css']
})
export class YakeenCityCenterComponent implements OnInit {
  newCityCenter: YakeenCityCenter = new YakeenCityCenter();
  clicked = false;

  constructor(private _yakeenCityCenterService: YakeenCityCenterService,
              private _toastrService: ToastrService,
              private _router: Router) { }

  ngOnInit() {
  }

  AddYakeenCityCenterModel() {
    this.clicked = true;
    this._yakeenCityCenterService.addNewYakeenCityCenter(this.newCityCenter).subscribe(data => {
      if (data.data.ErrorCode === 1) {
        this._toastrService.success(data.data.ErrorDescription);
        this._router.navigate(['/admin/allYakeenCityCenter']);
      } else {
        this._toastrService.error(data.data.ErrorDescription);
      }
      this.clicked = false;
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
        });
      }
    });
  }

}
