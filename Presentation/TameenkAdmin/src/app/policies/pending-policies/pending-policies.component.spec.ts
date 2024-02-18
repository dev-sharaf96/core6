import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPoliciesComponent } from './pending-policies.component';

describe('PendingPoliciesComponent', () => {
  let component: PendingPoliciesComponent;
  let fixture: ComponentFixture<PendingPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
