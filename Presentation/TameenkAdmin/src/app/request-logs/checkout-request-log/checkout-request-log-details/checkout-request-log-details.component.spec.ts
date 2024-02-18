import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRequestLogDetailsComponent } from './checkout-request-log-details.component';

describe('CheckoutRequestLogDetailsComponent', () => {
  let component: CheckoutRequestLogDetailsComponent;
  let fixture: ComponentFixture<CheckoutRequestLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutRequestLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutRequestLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
