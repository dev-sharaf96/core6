import { PromotionProgramDomain } from './../core/models/promotion-program-domain.model';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonResponse, PromotionProgramDomainService } from '../core';
import { ToastrService } from 'ngx-toastr';
import {InputSwitchModule} from 'primeng/inputswitch';


@Component({
  selector: 'app-promotion-program-domain',
  templateUrl: './promotion-program-domain.component.html',
  styleUrls: ['./promotion-program-domain.component.css']
})
export class PromotionProgramDomainComponent implements OnInit {

  promotionProgramDomains : PromotionProgramDomain[];
  id;
  load:boolean;
  constructor(private _promotionProgramDomainService: PromotionProgramDomainService, private _router: Router, private _activatedRoute: ActivatedRoute ,  private _toastrService: ToastrService)
  {

  }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.getPromotionDomains();
    this.load = true;


  }

  getPromotionDomains(){
    this._promotionProgramDomainService.getAllPromotionDomainsByProgramId(this.id).subscribe(
      (result: CommonResponse<PromotionProgramDomain[]>) => {
        this.promotionProgramDomains = result.data;
        this.load = false;
      }
      ,
     (error) => {
      this.load = false;
    });

  }

  handleChange(e , id) {
   let isChecked = e.checked;
   this.load = true;
   this._promotionProgramDomainService.changeDomainStatus(id, isChecked).subscribe(
     (result: CommonResponse<PromotionProgramDomain[]>) => {
       this.promotionProgramDomains = result.data;
       this.load = false;
     }
     ,
    (error) => {
     this.load = false;
   });
}



}
