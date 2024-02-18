import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryRequestLogDetailsComponent } from './inquiry-request-log-details.component';

describe('InquiryRequestLogDetailsComponent', () => {
  let component: InquiryRequestLogDetailsComponent;
  let fixture: ComponentFixture<InquiryRequestLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryRequestLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryRequestLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
