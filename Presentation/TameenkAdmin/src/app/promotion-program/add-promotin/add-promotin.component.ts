import { Component, OnInit } from '@angular/core';
import { Promotion, PromotionService, CommonResponse } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-add-promotin',
  templateUrl: './add-promotin.component.html',
  styleUrls: ['./add-promotin.component.css']
})
export class AddPromotinComponent implements OnInit {
promotion: Promotion = new Promotion();
isEdit: boolean;
id;
errors: string[];
loading = false;
today : Date;
  constructor(private _promotionService: PromotionService, private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService)
   {

   }

  ngOnInit() {
    this.today = new Date();
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;
    this.promotion.Id = this.id;
    if(this.isEdit)
    {

      this.fillPromotionObject();

    }

    

  }
submit(form) {
  if (form.valid) {
    if(this.promotion.Id == null ){
      this.addPromotion(this.promotion);
    }
    else{
      this.editPromotion(this.promotion);
    }

  }
}
addPromotion(promotion)
{
  this._promotionService.addPromotion(this.promotion).subscribe(data => {
    // any code
    this._router.navigate(['/admin/promotion']);
  }, (error) => {

    this.loading = false;
    this.errors = [error.error_promotion];
    this._toastrService.error(error.error_promotion);
  });

}
editPromotion(promotion)
{
  this._promotionService.editPromotion(this.promotion).subscribe(data => {
    // any code
    this._router.navigate(['/admin/promotion']);
  }, (error) => {
    this.loading = false;
    this.errors = [error.error_edit_promotion];
    this._toastrService.error(error.error_edit_promotion);
  });

}
getPromotionObject(id){


  this._promotionService.getPromotionById(id).subscribe(
    (result: CommonResponse<Promotion>) => {
      this.promotion = result.data;
      if(this.promotion.DeactivatedDate != null)
      {
        this.promotion.DeactivatedDate = new Date(this.promotion.DeactivatedDate);

      }
      if(this.promotion.EffectiveDate != null)
      {
        this.promotion.EffectiveDate = new Date(this.promotion.EffectiveDate);

      }

    }, (error) => {
    this.loading = false;
        this.errors = [error.error_description];
        this._toastrService.error(error.error_description);
  });
}
fillPromotionObject()
{
  this.getPromotionObject(this.id);
}
changeDeffectiveDate()
{
  this.promotion.DeactivatedDate = null;
}

}
