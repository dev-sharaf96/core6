
import { Component, OnInit } from '@angular/core';
import { Promotion, PromotionService, CommonResponse } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {InputSwitchModule} from 'primeng/inputswitch';


@Component({
  selector: 'app-promotion-program',
  templateUrl: './promotion-program.component.html',
  styleUrls: ['./promotion-program.component.css']
})
export class PromotionProgramComponent implements OnInit {
  cars = [];
  promotions: Promotion[];
  load:boolean;
  checked :boolean = true;
  constructor(private _promotionService: PromotionService, private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService)
  {



  }

  ngOnInit() {
    this.load = true;
    this.getPromotions();
    this.checked=true;
  }

  getPromotions(){

    this._promotionService.getAllPromotion().subscribe(
      (result: CommonResponse<Promotion[]>) => {
        this.promotions = result.data;
        this.load = false;
      }
      ,
     (error) => {
      this.load = false;
    });

  }

  handleChange(e , id) {
    let isChecked = e.checked;


    this._promotionService.changeStatus(id, isChecked).subscribe(
      (result: CommonResponse<Promotion[]>) => {
        this.promotions = result.data;
        this.load = false;
      }
      ,
     (error) => {
      this.load = false;
    });
}

onCancel(lock , id) {
  this.load = true;
  this._promotionService.changeStatus(id, lock).subscribe((result: CommonResponse<Promotion[]>) => {
    this.promotions = result.data;
    this.load = false;
  }, (error) => {
    this.load = false;
  });
}

}
