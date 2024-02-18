import { Component, OnInit } from '@angular/core';
import { Page, AdminPagesService, AuthenticationService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  pages: Page[];
  firstTime: boolean;
  constructor(
    private _adminPagesService: AdminPagesService,
    private _authService: AuthenticationService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllPages();
  }

  changeState(page: Page) {
    this._adminPagesService.updatePage(page).subscribe();
    this._authService.setPages(page);
  }


  getAllPages() {
    this._adminPagesService.getAllPages().subscribe((pages: Page[]) => {
      this.pages = pages;
      this.firstTime = false;
    }, (error: any) => {
      this.firstTime = false;
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
}
