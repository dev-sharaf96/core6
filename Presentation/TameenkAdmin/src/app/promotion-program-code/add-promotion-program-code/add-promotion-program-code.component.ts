import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  PromotionProgramCodeService,
  PromotionProgramCode,
  CommonResponse
} from 'src/app/core';

@Component({
  selector: 'app-add-promotion-program-code',
  templateUrl: './add-promotion-program-code.component.html',
  styleUrls: ['./add-promotion-program-code.component.css']
})
export class AddPromotionProgramCodeComponent implements OnInit {
  promotionProgramCode: PromotionProgramCode = new PromotionProgramCode();
  isEdit: boolean;
  id;
  errors: string[];
  loading = false;
  constructor(
    private _promotionProgramCodeService: PromotionProgramCodeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;
    // this.promotionProgramCode.id = this.id;
    if (this.isEdit) {
      // this.fillPromotionObject();
    }
  }

  submit(form) {
    if (form.valid) {
      if (this.promotionProgramCode.id == null) {
        this.addPromotionProgramCode(this.promotionProgramCode);
      } else {
        this.editPromotionProgramCode(this.promotionProgramCode);
      }
    }
  }

  addPromotionProgramCode(promotionProgramCode) {
    this._promotionProgramCodeService
      .addPromotionCode(this.promotionProgramCode)
      .subscribe(
        (data: CommonResponse<PromotionProgramCode>)=> {
          console.log("Data Here");
          console.log(data.data.PromotionProgramId);
          // any code
          this._router.navigate(['/admin/promotion/PromotionProgramCodeDetails/',data.data.PromotionProgramId ]);
        },
        error => {
          this.loading = false;
          this.errors = [error.error_promotion];
          this._toastrService.error(error.error_promotion);
        }
      );
  }
  editPromotionProgramCode(promotionProgramCode) {
    this._promotionProgramCodeService
      .editPromotionCode(this.promotionProgramCode)
      .subscribe(
        data => {
          // any code
          this._router.navigate(['/admin/PromotionProgramCode']);
        },
        error => {
          this.loading = false;
          this.errors = [error.error_edit_promotion];
          this._toastrService.error(error.error_edit_promotion);
        }
      );
  }

  getPromotionCodeObject(id) {
    this._promotionProgramCodeService.getPromotionCodeById(id).subscribe(
      (result: CommonResponse<PromotionProgramCode>) => {
        this.promotionProgramCode = result.data;
      },
      error => {
        this.loading = false;
        this.errors = [error.error_description];
        this._toastrService.error(error.error_description);
      }
    );
  }
  fillPromotionObject() {
    this.getPromotionCodeObject(this.id);
  }
}
