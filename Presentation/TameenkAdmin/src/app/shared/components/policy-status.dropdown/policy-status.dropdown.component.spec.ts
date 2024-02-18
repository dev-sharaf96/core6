import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyStatusDropdownComponent } from './policy-status.dropdown.component';

describe('PolicyStatus.DropdownComponent', () => {
  let component: PolicyStatusDropdownComponent;
  let fixture: ComponentFixture<PolicyStatusDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyStatusDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
