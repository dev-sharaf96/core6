import { Component, OnInit } from '@angular/core';
import { TameenkUser, TameenkUsersService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tameenk-users',
  templateUrl: './tameenk-users.component.html',
  styleUrls: ['./tameenk-users.component.css']
})
export class TameenkUsersComponent implements OnInit {
  users: TameenkUser[];
  firstTime: boolean;
  showsave: boolean = false;
  emptyStringValue = 'ــــــــــــــــــ';
  constructor(
    private _usersService: TameenkUsersService,
    private _toastrService: ToastrService
  )
  {
  }

  ngOnInit() {
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

  changeState(user: TameenkUser) {
    this._usersService.updateUser(user).subscribe();
  }
}
