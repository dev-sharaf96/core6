import { TestBed } from '@angular/core/testing';

import { InquiryWorkflowService } from './inquiry-workflow.service';

describe('InquiryWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquiryWorkflowService = TestBed.get(InquiryWorkflowService);
    expect(service).toBeTruthy();
  });
});
