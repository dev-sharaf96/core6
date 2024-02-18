import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomersOverFivePolicyComponent } from './get-customers-over-five-policy.component';

describe('GetCustomersOverFivePolicyComponent', () => {
  let component: GetCustomersOverFivePolicyComponent;
  let fixture: ComponentFixture<GetCustomersOverFivePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCustomersOverFivePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCustomersOverFivePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
