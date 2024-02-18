import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsRenewalLogComponent } from './sms-renewal-log.component';

describe('SmsRenewalLogComponent', () => {
  let component: SmsRenewalLogComponent;
  let fixture: ComponentFixture<SmsRenewalLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsRenewalLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsRenewalLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
