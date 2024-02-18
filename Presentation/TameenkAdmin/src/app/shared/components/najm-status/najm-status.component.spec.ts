import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NajmStatusComponent } from './najm-status.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { InsuranceCompanyService, LocalizationService } from '../../../core';
import {RouterTestingModule} from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('NajmStatusComponent', () => {
  let component: NajmStatusComponent;
  let fixture: ComponentFixture<NajmStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NajmStatusComponent ],
      imports: [RouterTestingModule, FormsModule, HttpClientModule, TranslateModule.forRoot({
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
    fixture = TestBed.createComponent(NajmStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
