import { Component, OnInit } from '@angular/core';
import { Page, AdminPagesService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pageInfo: Page = new Page();
  submitted = false;
  id: string;
  isEditPage: boolean;
  pages: Page[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _adminPagesService: AdminPagesService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.isEditPage = !!this.id;
    if (this.isEditPage) {
      this._adminPagesService.getPage(this.id).subscribe(page => {
        this.pageInfo = page;
      }, (error) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
    this._adminPagesService.getAllPages().subscribe((pages: Page[]) => {
      this.pages = pages;
    });
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      if (this.isEditPage) {
        this.editPage();
        return;
      }
      this.addPage();
    }
  }

  editPage() {
    this._adminPagesService.updatePage(this.pageInfo).subscribe(() => {
      this._router.navigate(['/s/pages']);
    }, (error) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  addPage() {
    this._adminPagesService.addPage(this.pageInfo).subscribe(() => {
      this._router.navigate(['/s/pages']);
    }, (error) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  displayFieldCss(field: FormControl) {
    return {
      'has-error': field.invalid && this.submitted
    };
  }
}
