import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryRequestLogComponent } from './inquiry-request-log.component';

describe('InquiryRequestLogComponent', () => {
  let component: InquiryRequestLogComponent;
  let fixture: ComponentFixture<InquiryRequestLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryRequestLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryRequestLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
