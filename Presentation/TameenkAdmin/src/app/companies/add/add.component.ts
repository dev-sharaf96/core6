import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InsuranceCompany, Contact, Address, InsuranceCompanyService, CommonResponse } from '../../core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  contact: Contact = new Contact();
  address: Address = new Address();
  insuranceCompany: InsuranceCompany = new InsuranceCompany(this.address, this.contact);
  error: boolean = false;
  errorMessage: string = "";

  /**
   * @constructor Creates an instance of Add Company
   * @param {TranslateService} translate
   * @memberof AddCompanyComponent
   */
  constructor(
    private translate: TranslateService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private router: Router, private _toastrService: ToastrService
  ) {

  }

 /**
  * submit Form */
  OnSubmit() {


    this.insuranceCompany.id = 0;
    this.insuranceCompany.createdDate = '2018-05-07 17:47:05.500';

    if (this.insuranceCompany.isActive == undefined)
           this.insuranceCompany.isActive = true;


      this._insuranceCompanyService
        .addInsuranceCompany(this.insuranceCompany)
        .subscribe(
          (data: any) => {

            this.router.navigate(['admin/companies']);
              this.error = false;

          },
          (error: any) => {
            this.error = true;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
            // this.errorMessage = error.errors[0].description;
          }
        );
      }



  ngOnInit() {


  }
  }



