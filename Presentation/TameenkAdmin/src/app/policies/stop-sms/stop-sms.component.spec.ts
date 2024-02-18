import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSMSComponent } from './stop-sms.component';

describe('RenewalDiscountComponent', () => {
  let component: StopSMSComponent;
  let fixture: ComponentFixture<StopSMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopSMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
