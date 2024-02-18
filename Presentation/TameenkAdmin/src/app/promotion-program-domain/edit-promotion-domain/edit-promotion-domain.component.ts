
import { Component, OnInit } from '@angular/core';
import {  PromotionProgramDomainService, CommonResponse } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'selenium-webdriver';
import { PromotionProgramDomain } from 'src/app/core/models/promotion-program-domain.model';

@Component({
  selector: 'app-edit-promotion-domain',
  templateUrl: './edit-promotion-domain.component.html',
  styleUrls: ['./edit-promotion-domain.component.css']
})
export class EditPromotionDomainComponent implements OnInit {

  promotionProgramDomain: PromotionProgramDomain = new PromotionProgramDomain();
isEdit: boolean;
id;
errors: string[];
loading = false;
  constructor(private _PromotionProgramDomainService: PromotionProgramDomainService, private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService)
  {

  }

 ngOnInit() {
   this.id = this._activatedRoute.snapshot.paramMap.get('id');
   this.isEdit = !!this.id;
   this.promotionProgramDomain.Id = this.id;
   if(this.isEdit)
   {

     this.fillPromotionDomainObject();

   }

 }
 getPromotionDomainObject(id){

    this._PromotionProgramDomainService.getPromotionDomainById(id).subscribe(
      (result: CommonResponse<PromotionProgramDomain>) => {
        this.promotionProgramDomain = result.data;


      }, (error) => {
      this.loading = false;
          this.errors = [error.error_description];
          this._toastrService.error(error.error_description);
    });
  }
  fillPromotionDomainObject()
  {
    this.getPromotionDomainObject(this.id);
  }
  submit(form) {
    if (form.valid) {

        this.editPromotionProgramDomain(this.promotionProgramDomain);


    }
  }
  editPromotionProgramDomain(promotionProgramCode)
  {
  this._PromotionProgramDomainService.editPromotionDomain(this.promotionProgramDomain).subscribe(data => {

     this._router.navigate(['/admin/promotion/PromotionProgramDomain/' , this.promotionProgramDomain.PromotionProgramId]);
  }, (error) => {
    this.loading = false;
    this.errors = [error.error_edit_promotion];
    this._toastrService.error(error.error_edit_promotion);
  });

  }

}
