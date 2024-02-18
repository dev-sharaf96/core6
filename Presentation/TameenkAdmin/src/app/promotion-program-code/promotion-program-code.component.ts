import { PromotionProgramCode } from './../core/models/promotion-program-code.model';
import { Component, OnInit } from '@angular/core';
import { PromotionProgramCodeService } from '../core/services/promotion-program-code.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonResponse } from '../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotion-program-code',
  templateUrl: './promotion-program-code.component.html',
  styleUrls: ['./promotion-program-code.component.css']
})
export class PromotionProgramCodeComponent implements OnInit {

  promotionProgramCodes : PromotionProgramCode[];
  constructor(private _promotionCodeService: PromotionProgramCodeService, private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService)
  {

  }

  ngOnInit() {
    this.getPromotions();
  }

  getPromotions(){
    this._promotionCodeService.getAllPromotionCode().subscribe(
      (result: CommonResponse<PromotionProgramCode[]>) => {
        this.promotionProgramCodes = result.data;
      }
      ,
     (error) => {

    });

  }


}
