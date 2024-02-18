import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRequestLogComponent } from './checkout-request-log.component';

describe('CheckoutRequestLogComponent', () => {
  let component: CheckoutRequestLogComponent;
  let fixture: ComponentFixture<CheckoutRequestLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutRequestLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutRequestLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
