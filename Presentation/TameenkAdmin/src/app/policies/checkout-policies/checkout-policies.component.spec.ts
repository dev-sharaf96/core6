import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPoliciesComponent } from './checkout-policies.component';

describe('CheckoutPoliciesComponent', () => {
  let component: CheckoutPoliciesComponent;
  let fixture: ComponentFixture<CheckoutPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
