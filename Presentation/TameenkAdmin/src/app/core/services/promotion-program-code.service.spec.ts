import { TestBed } from '@angular/core/testing';

import { PromotionProgramCodeService } from './promotion-program-code.service';

describe('PromotionProgramCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionProgramCodeService = TestBed.get(PromotionProgramCodeService);
    expect(service).toBeTruthy();
  });
});
