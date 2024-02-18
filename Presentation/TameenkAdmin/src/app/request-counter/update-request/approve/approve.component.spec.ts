import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApproveComponent } from './approve.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PolicyService, LocalizationService } from '../../../core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('ApproveComponent', () => {
  let component: ApproveComponent;
  let fixture: ComponentFixture<ApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ], providers: [PolicyService, LocalizationService],
      imports: [
        HttpClientModule, RouterTestingModule, TranslateModule.forRoot({
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
    fixture = TestBed.createComponent(ApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
