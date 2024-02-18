import { PromotionProgramDomain } from './../../core/models/promotion-program-domain.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromotionProgramDomainService, CommonResponse } from 'src/app/core';

@Component({
  selector: 'app-add-promotion-program-domain-component',
  templateUrl: './add-promotion-program-domain-component.component.html',
  styleUrls: ['./add-promotion-program-domain-component.component.css']
})
export class AddPromotionProgramDomainComponentComponent implements OnInit {

  promotionProgramDomain: PromotionProgramDomain = new PromotionProgramDomain();
  isEdit: boolean;
  id;
  domainId ;

  errors: string[];
  loading = false;
    constructor(private _promotionProgramDomainService: PromotionProgramDomainService, private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService)
     {

     }
     ngOnInit() {
      this.id = this._activatedRoute.snapshot.paramMap.get('id');
      this.promotionProgramDomain.PromotionProgramId = this.id;
       this.isEdit = !!this.promotionProgramDomain.Id;

       if(this.isEdit)
       {

      this.fillPromotionDomainObject();

       }

    }

    submit(form) {
      if (form.valid) {
        if(this.promotionProgramDomain.Id== null ){
          this.addPromotionProgramDomain(this.promotionProgramDomain);
        }
        else{
          this.editPromotionProgramDomain(this.promotionProgramDomain);
        }

      }
    }


    addPromotionProgramDomain(promotionProgramCode){

    this._promotionProgramDomainService.addPromotionDomain(this.promotionProgramDomain).subscribe(data => {
      // any code

      this._router.navigate(['/admin/promotion/PromotionProgramDomain/' , this.id]);
    }, (error) => {

      this.loading = false;
      this.errors = [error.error_promotion];
      this._toastrService.error(error.error_promotion);
    });
    }
    editPromotionProgramDomain(promotionProgramCode)
    {

    this._promotionProgramDomainService.editPromotionDomain(this.promotionProgramDomain).subscribe(data => {
      // any code
     this._router.navigate(['/admin/PromotionProgramDomain']);
      // this._router.navigate(['/admin/promotion/PromotionProgramDomain/' , this.id]);
    }, (error) => {
      this.loading = false;
      this.errors = [error.error_edit_promotion];
      this._toastrService.error(error.error_edit_promotion);
    });

    }

    getPromotionDomainObjectForEdit(id){


        this._promotionProgramDomainService.getPromotionDomainById(id).subscribe(
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
        this.getPromotionDomainObjectForEdit(this.id);
      }

}
