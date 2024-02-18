import { TestBed } from '@angular/core/testing';

import { AutoleasingWalletService } from './autoleasing-wallet.service';

describe('CorporateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoleasingWalletService = TestBed.get(AutoleasingWalletService);
    expect(service).toBeTruthy();
  });
});
