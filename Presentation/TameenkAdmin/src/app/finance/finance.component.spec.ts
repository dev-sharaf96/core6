import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceComponent } from './finance.component';
import { ProductsDropdownComponent } from '../shared/components/products-dropdown/products-dropdown.component';
import { InsuranceCompaniesComponent } from '../shared/components/insurance-companies/insurance-companies.component';
import { FormsModule } from '@angular/forms';
import { InsuranceCompanyService, LocalizationService } from '../core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, ChartModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

// ? to resolve Chart is not defined
import 'node_modules/chart.js/dist/Chart.min.js';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


describe('FinanceComponent', () => {
  let component: FinanceComponent;
  let fixture: ComponentFixture<FinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceComponent, ProductsDropdownComponent, InsuranceCompaniesComponent ],
      imports: [ HttpClientModule, RouterTestingModule, TranslateModule, BrowserAnimationsModule,
        FormsModule, CalendarModule, ChartModule, TableModule , TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      ToastrModule.forRoot()],
      providers: [ InsuranceCompanyService, LocalizationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
