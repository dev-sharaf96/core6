import { TestBed } from '@angular/core/testing';

import { CheckoutResolverService } from './checkout-resolver.service';

describe('CheckoutResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutResolverService = TestBed.get(CheckoutResolverService);
    expect(service).toBeTruthy();
  });
});
