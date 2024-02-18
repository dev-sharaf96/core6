import { CancelPolicyService } from './cancel-policy.service';
import { TestBed } from '@angular/core/testing';

describe('CancelPolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelPolicyService = TestBed.get(CancelPolicyService);
    expect(service).toBeTruthy();
  });
});
