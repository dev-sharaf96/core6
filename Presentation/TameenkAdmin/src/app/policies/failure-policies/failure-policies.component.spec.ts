import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailurePoliciesComponent } from './failure-policies.component';

describe('FailurePoliciesComponent', () => {
  let component: FailurePoliciesComponent;
  let fixture: ComponentFixture<FailurePoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailurePoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailurePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
