import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InsuranceCompany, InsuranceCompanyService, CommonResponse, Address, Contact } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  insuranceCompany: InsuranceCompany = new InsuranceCompany(new Address(), new Contact());
  error: boolean = false;
  errorMessage: string = "";
  InEdit: boolean = true;
  ordersList:  number[] = [];
  /**
   * The Constructor .
   * @param route
   * @param _insuranceCompanyService
   * @param router
   */
  constructor(
    private route: ActivatedRoute,private _insuranceCompanyService: InsuranceCompanyService,
    private router: Router, private _toastrService: ToastrService) {
    let insuranceCompanyId = parseInt(this.route.snapshot.paramMap.get('id'));

    this._insuranceCompanyService.getById(insuranceCompanyId).subscribe((response) => {
      this.insuranceCompany = response.data;


      if (this.insuranceCompany != null) {
        if (this.insuranceCompany.address == null) {
          this.insuranceCompany.address = new Address();

        }

        if (this.insuranceCompany.contact == null) {
          this.insuranceCompany.contact = new Contact();

        }
      } else {
        // navigate to Error Page ...
      }
    });
    this._insuranceCompanyService.getAllInsuranceCompanies(0, 1000, null, false).subscribe((response) => {
      response.data.forEach((comp) => {
        this.ordersList.push(comp.order);
      });
    });
  }
  ngOnInit(): void {


  }
  /*
   * submit form */
  OnSubmit() {

    if (this.insuranceCompany.descEN == undefined || this.insuranceCompany.descEN == null) {
      this.insuranceCompany.descEN = '';
    }

    this.insuranceCompany.address.id = this.insuranceCompany.address.id;
    this.insuranceCompany.contact.id = this.insuranceCompany.contact.id;


    this._insuranceCompanyService.editInsuranceCompany(this.insuranceCompany)
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
        }
      );
  }




}



