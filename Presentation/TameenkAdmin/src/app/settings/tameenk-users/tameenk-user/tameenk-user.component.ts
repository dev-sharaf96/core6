import { Component, OnInit } from '@angular/core';
import { TameenkUser, AccountService, TameenkUsersService } from 'src/app/core';
import { UpdateCustomerModel } from 'src/app/core/models/UpdateCustomertModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tameenk-user',
  templateUrl: './tameenk-user.component.html',
  styleUrls: ['./tameenk-user.component.css']
})
export class TameenkUserComponent implements OnInit {
  user: TameenkUser = new TameenkUser();
  submitted = false;
  id: string;
  isEditUser: boolean;
  updateCustomer: UpdateCustomerModel = new UpdateCustomerModel();
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService,
    private _usersService: TameenkUsersService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.isEditUser = !!this.id;

    if (this.id) {
      this._usersService.getUser(this.id).subscribe(user => {
        this.user = user;
      });
    }
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid)
    {
        this.editUser();
        return;
    }
  }

  editUser() {

    this.updateCustomer.PromotionCodeCount = this.user.PromotionCodeCount;
    this.updateCustomer.PoliciesCount = this.user.PoliciesCount;
    this.updateCustomer.UserId= this.user.Id;
    this._usersService.updateUser(this.updateCustomer).subscribe(data => {
      this.submitted = false;
      this._toastrService.success('تم بنجاح');
      this._router.navigate(['s/TameenkUsers']);
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
