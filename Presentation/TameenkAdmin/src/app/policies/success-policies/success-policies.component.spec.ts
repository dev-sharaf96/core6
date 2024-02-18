import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPoliciesComponent } from './success-policies.component';

describe('SuccessPoliciesComponent', () => {
  let component: SuccessPoliciesComponent;
  let fixture: ComponentFixture<SuccessPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
