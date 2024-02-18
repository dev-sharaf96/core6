import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader, USE_DEFAULT_LANG, USE_STORE } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { TranslateParser } from '@ngx-translate/core';
import { MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InsuranceCompanyService, LocalizationService, Address, Contact, InsuranceCompany } from '../../core';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('AddCompanyComponent', () => {
  let component: AddComponent ;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        ToastrModule.forRoot()
      ],
      providers: [
        InsuranceCompanyService,
        LocalizationService,
        TranslateService, {
        provide: Router,
        useClass: class { navigate = jasmine.createSpy("navigate"); }
      }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should use InsuranceCompanyService to add new company with name space & class exist in DB', (done) => {
    let service = TestBed.get(InsuranceCompanyService);
    let insuranceCompany = new InsuranceCompany(new Address(), new Contact());
    insuranceCompany.nameAR = "شركه";
    insuranceCompany.nameEN = "company";
    insuranceCompany.namespaceTypeName = "company8";
    insuranceCompany.classTypeName = "company8";
    insuranceCompany.descAR = 'شركه';
    insuranceCompany.descEN = 'company';
    insuranceCompany.isActive = true;

    service.addInsuranceCompany(insuranceCompany).subscribe((value) => {
      expect(value.data).toBeTruthy();
      done();
    },
      (error) => {
        expect(error.data).toEqual(false);
        done();
      });
  });

  it('should use InsuranceCompanyService', () => {
    let service = TestBed.get(InsuranceCompanyService);
    let insuranceCompany = new InsuranceCompany(new Address(), new Contact());
    expect(service.addInsuranceCompany(insuranceCompany)).toBeTruthy();
  });

  xdescribe("pending spec", function () {


    it('should use InsuranceCompanyService to add new company', (done) => {
      let service = TestBed.get(InsuranceCompanyService);
      let insuranceCompany = new InsuranceCompany(new Address(), new Contact());
      insuranceCompany.nameAR = "شركه";
      insuranceCompany.nameEN = "company";
      insuranceCompany.namespaceTypeName = "company1000";
      insuranceCompany.classTypeName = "company1000";
      insuranceCompany.descAR = 'شركه';
      insuranceCompany.descEN = 'company';
      insuranceCompany.isActive = true;

      service.addInsuranceCompany(insuranceCompany).subscribe((value) => {
        expect(value.data).toBeTruthy();
        done();
      });
    });

  });
});
