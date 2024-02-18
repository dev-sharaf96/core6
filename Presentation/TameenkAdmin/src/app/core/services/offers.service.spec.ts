import { OfferService } from './offer.service';
import { TestBed } from '@angular/core/testing';
 

describe('OfferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferService = TestBed.get(OfferService);
    expect(service).toBeTruthy();
  });
});
