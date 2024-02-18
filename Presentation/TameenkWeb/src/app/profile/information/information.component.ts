import { Component, OnInit } from '@angular/core';
import { UserService, CommonResponse, IUser, AuthService } from 'src/app/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  userInfo: IUser;
  isPromotionProgram = false;
  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
    this._userService.getUserInfo(this._authService.getUserId()).subscribe((data: CommonResponse<IUser>) => {
      this.userInfo = data.data;
    },
    (error: any) => error);
  }
  toggleProgram() {
    this.isPromotionProgram = !this.isPromotionProgram;
  }
}
