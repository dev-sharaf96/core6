import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, AccountService, InsuranceCompanyService, UsersService } from 'src/app/core';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  submitted = false;
  id: string;
  isEditUser: boolean;
  companies;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _usersService: UsersService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.isEditUser = !!this.id;
    this.companies = this._insuranceCompanyService.getInsuranceCompaniesName().pipe(map(data => data.data));
    if (this.id) {
      this._usersService.getUser(this.id).subscribe(user => {
        this.user = user;
      });
    }
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      if (this.isEditUser) {
        this.editUser();
        return;
      }
      this.addUser(form);
    }
  }

  editUser() {
    this._usersService.updateUser(this.user).subscribe(data => {
      this.submitted = false;
      this._toastrService.success('تم بنجاح');
      this._router.navigate(['s/users']);
    }, (error: any) => {
      this._toastrService.error(error.Message);
    });
  }

  addUser(form) {
    this._accountService.register(this.user).subscribe(data => {
      this._toastrService.success('تم بنجاح');
      form.reset();
      this.submitted = false;
    }, (error: any) => {
      this._toastrService.error(error.Message);
    });
  }

  displayFieldCss(field) {
    return {
      'has-error': field.invalid && this.submitted
    };
  }
}
