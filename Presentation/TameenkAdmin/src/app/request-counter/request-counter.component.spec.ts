import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCounterComponent } from './request-counter.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PolicyService } from '../core/services/policy.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalizationService } from '../core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('RequestCounterComponent', () => {
  let component: RequestCounterComponent;
  let fixture: ComponentFixture<RequestCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCounterComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [PolicyService, LocalizationService],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
