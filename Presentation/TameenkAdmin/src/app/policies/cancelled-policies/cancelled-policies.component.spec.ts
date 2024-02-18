import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledPoliciesComponent } from './cancelled-policies.component';

describe('CancelledPoliciesComponent', () => {
  let component: CancelledPoliciesComponent;
  let fixture: ComponentFixture<CancelledPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
