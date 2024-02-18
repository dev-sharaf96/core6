import { Component, OnInit } from '@angular/core';
import { UserPagesService, UsersService, AdminPagesService, Page } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.css']
})
export class UserPagesComponent implements OnInit {
users;
pages: Page[];
loading: boolean;
selectedValues: number[] = [];
userId: number;
  constructor(
    private _usersService: UsersService,
    private _userPagesService: UserPagesService,
    private _adminPagesService: AdminPagesService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this.users = this._usersService.getAllUsers();
    this.getAllPages();
  }


  getAllPages() {
    this._adminPagesService.getActivePages().subscribe((pages: Page[]) => {
      this.pages = pages;
    }, (error: any) => {
      if (error && error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  selectUser(id) {
    this.loading = true;
    this.userId = id;
    this._userPagesService.getUserPagesIds(id).subscribe(data => {
      this.selectedValues = data;
      this.loading = false;
    }, (error: any) => {
      if (error && error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  save() {
    const list = this.selectedValues.map(x => {
      return {userId : this.userId, pageId : x};
    });
    this._userPagesService.saveUserPages(this.userId, list).subscribe(data => {
      this._toastrService.success('تم بنجاح');
    }, (error: any) => {
      if (error && error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
}
