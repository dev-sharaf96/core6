import { TestBed } from '@angular/core/testing';

import { PromotionProgramDomainService } from './promotion-program-domain.service';

describe('PromotionProgramDomainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionProgramDomainService = TestBed.get(PromotionProgramDomainService);
    expect(service).toBeTruthy();
  });
});
