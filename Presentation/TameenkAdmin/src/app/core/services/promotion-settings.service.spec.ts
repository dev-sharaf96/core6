import { TestBed } from '@angular/core/testing';

import { PromotionSettingsService } from './promotion-settings.service';

describe('PromotionSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionSettingsService = TestBed.get(PromotionSettingsService);
    expect(service).toBeTruthy();
  });
});
