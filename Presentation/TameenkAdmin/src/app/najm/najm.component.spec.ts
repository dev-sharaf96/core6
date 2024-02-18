import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NajmComponent } from './najm.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader, USE_DEFAULT_LANG, USE_STORE } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PolicyService, LocalizationService } from '../core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { TranslateParser } from '@ngx-translate/core';
import { MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {RouterTestingModule} from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('NajmComponent', () => {
  let component: NajmComponent;
  let fixture: ComponentFixture<NajmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NajmComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [
        RouterTestingModule,
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
      providers: [PolicyService, TranslateService, LocalizationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NajmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
