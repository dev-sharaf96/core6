import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromotionProgramCode, PromotionProgramCodeService, CommonResponse } from 'src/app/core';
@Component({
  selector: 'app-promotion-program-code-details',
  templateUrl: './promotion-program-code-details.component.html',
  styleUrls: ['./promotion-program-code-details.component.css']
})
export class PromotionProgramCodeDetailsComponent implements OnInit {
id;
  promotionProgramCodes: PromotionProgramCode[];
  load: boolean;
  constructor(private _promotionCodeService: PromotionProgramCodeService,
    private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService) {

  }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    this.getPromotions(this.id);
    this.load = true;
  }

  getPromotions(id) {
    this._promotionCodeService.getAllPromotionCodeByProgramId(id).subscribe(
      (result: CommonResponse<PromotionProgramCode[]>) => {
        this.promotionProgramCodes = result.data;
        this.load = false;
      }
      ,
     (error) => {
      this.load = false;
    });

  }
}
