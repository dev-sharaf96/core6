import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { PolicyService } from './policy.service';
import { LocalizationService } from '.';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonResponse } from '../models';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('PolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        PolicyService,
        LocalizationService
      ]

    });
  });

  it('should be created', inject([PolicyService], (service: PolicyService) => {
    expect(service).toBeTruthy();
  }));

  it('refundPolicy refund With Empty referenceId', (done) => {
    let service = TestBed.get(PolicyService);
    service.refundPolicy('').subscribe((value) => {
      done();
    },
      (error) => {
        expect(error.data).toEqual(false);
        done();
      }
    );
  });

  it('refundPolicy refund With Empty referenceId return error message', (done) => {
    let service = TestBed.get(PolicyService);
    service.refundPolicy('').subscribe((value) => {
      done();
    },
      (error: CommonResponse<boolean>) => {
        expect(error.data).toEqual(false);
        expect(error.errors.length).toBeGreaterThanOrEqual(1);
        expect(error.errors[0].description).toContain("Reference Id Can't be null or empty.");
        done();
      }
    );
  });

  it('refundPolicy refund With Fake referenceId should return error message', (done) => {
    let service = TestBed.get(PolicyService);
    service.refundPolicy('GGAAGGAAGGAAhh').subscribe((value) => {
      done();
    },
      (error: CommonResponse<boolean>) => {
        expect(error.data).toEqual(false);
        expect(error.errors.length).toBeGreaterThanOrEqual(1);
        expect(error.errors[0].description).toContain("There is no policy with this reference Id.");
        done();
      }
    );
  });

});
