import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEditAddComponent } from './form-edit-add.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { InsuranceCompany, Address, Contact } from '../../core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


describe('FormEditAddComponent', () => {
  let component: FormEditAddComponent;
  let fixture: ComponentFixture<FormEditAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditAddComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditAddComponent);
    component = fixture.componentInstance;
    component.insuranceCompany = new InsuranceCompany(new Address, new Contact);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

