import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InsuranceCompanyService, InsuranceCompany, CommonResponse, Contact, Address, LocalizationService } from '../../core';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormEditAddComponent } from '../form-edit-add/form-edit-add.component';

  import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
  import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateService } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('EditCompanyComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent],
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
        LocalizationService,
        InsuranceCompanyService,  {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
        ,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use InsuranceCompanyService get insurance company By id return insurance company', (done) => {
    let service = TestBed.get(InsuranceCompanyService);
    let id = 1;
    service.getById(id).subscribe((value) => {
      expect(value.data).toBeTruthy();
      expect(value.data.id).toEqual(id);
      done();
    },
      (error) => {
        expect(error.data).toEqual(false);
        done();
      });
  });

  it('should use InsuranceCompanyService get insurance company with negative id', (done) => {
    let service = TestBed.get(InsuranceCompanyService);
    let id = -1;
    service.getById(id).subscribe((value) => {
      expect(value.data).toBeTruthy();
      expect(value.data.id).toEqual(id);
      done();
    },
      (error) => {
        expect(error.data).toEqual(false);
        done();
      });
  });


  it('should use InsuranceCompanyService get insurance company with fake id', (done) => {
    let service = TestBed.get(InsuranceCompanyService);
    let id = 100;
    service.getById(id).subscribe((value) => {
      expect(value.data).toBeTruthy();
      expect(value.data.id).toEqual(id);
      done();
    },
      (error) => {
        expect(error.data).toEqual(false);
        done();
      });
  });

  it('should use InsuranceCompanyService get insurance company with zero id', (done) => {
    let service = TestBed.get(InsuranceCompanyService);
    let id = 0;
    service.getById(id).subscribe((value) => {
      expect(value.data).toBeTruthy();
      expect(value.data.id).toEqual(id);
      done();
    },
      (error) => {
        expect(error.data).toEqual(false);
        done();
      });
  });


  it('should use InsuranceCompanyService', () => {
    let service = TestBed.get(InsuranceCompanyService);
    let id = 1;
    expect(service.getById(id)).toBeTruthy();
  });

  // Edit Service
  it('should use InsuranceCompanyService to edit exist company in DB', (done) => {
    let service = TestBed.get(InsuranceCompanyService);
    let insuranceCompany = new InsuranceCompany(new Address, new Contact);
    let id = 32;
    service.getById(id).subscribe((value) => {

      expect(value.data).toBeTruthy();
      expect(value.data.id).toEqual(id);

      insuranceCompany = value.data;

      insuranceCompany.nameAR = "شركه";
      insuranceCompany.nameEN = "companyloza";

      insuranceCompany.descAR = "hehehehehehehehe";

      insuranceCompany.descEN = 'loza';

      insuranceCompany.namespaceTypeName = "loza";
      insuranceCompany.classTypeName = "loza";
      insuranceCompany.address.address1 = "address";
      service.editInsuranceCompany(insuranceCompany).subscribe((v) => {
        expect(v.data).toBeTruthy();
        done();
      });
    done();
    });


  });



});



