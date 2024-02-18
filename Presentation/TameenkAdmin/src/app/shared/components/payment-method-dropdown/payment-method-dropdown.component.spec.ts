import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodDropdownComponent } from './payment-method-dropdown.component';

describe('PaymentMethodDropdownComponent', () => {
  let component: PaymentMethodDropdownComponent;
  let fixture: ComponentFixture<PaymentMethodDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
