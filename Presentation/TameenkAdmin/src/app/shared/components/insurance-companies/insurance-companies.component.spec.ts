import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCompaniesComponent } from './insurance-companies.component';
import { FormsModule } from '@angular/forms';
import { InsuranceCompanyService, LocalizationService } from '../../../core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('InsuranceCompaniesComponent', () => {
  let component: InsuranceCompaniesComponent;
  let fixture: ComponentFixture<InsuranceCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCompaniesComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      ToastrModule.forRoot()],
      providers: [InsuranceCompanyService, LocalizationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
