import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService, User, InsuranceCompanyService, AccountService } from 'src/app/core';
import { of } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  constructor(
    private _usersService: UsersService,
    private _accountService: AccountService,
    private _toastrService: ToastrService,
    private _insuranceCompanyService: InsuranceCompanyService
  ) {}

  ngOnInit() {
    this._insuranceCompanyService.getInsuranceCompaniesName().subscribe(data => {
      this._insuranceCompanyService.companies.next(data.data);
    });
    this.firstTime = true;
    this._usersService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.firstTime = false;
      },
      (error: any) => {
        this.firstTime = false;
        this._toastrService.error(error.Message);
      }
      );
    }

    changeState(user: User) {
      this._usersService.updateUser(user).subscribe();
    }

    resetPass(id) {
      this._accountService.resetPassword({UserId: id}).subscribe(data => {
        this._toastrService.success('تم بنجاح');
      }, error => {
        this._toastrService.error(error.Message);
    });
  }
}
