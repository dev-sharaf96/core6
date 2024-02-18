import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceComponent } from './invoice.component';
import { ProductsDropdownComponent } from '../shared/components/products-dropdown/products-dropdown.component';
import { InsuranceCompaniesComponent } from '../shared/components/insurance-companies/insurance-companies.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CalendarModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { InsuranceCompanyService, LocalizationService } from '../core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceComponent, ProductsDropdownComponent, InsuranceCompaniesComponent ],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, CalendarModule, TableModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [InsuranceCompanyService, LocalizationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
