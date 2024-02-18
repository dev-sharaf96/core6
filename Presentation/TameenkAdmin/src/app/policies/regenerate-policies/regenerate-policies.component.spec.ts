import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegeneratePoliciesComponent } from './regenerate-policies.component';

describe('RegeneratePoliciesComponent', () => {
  let component: RegeneratePoliciesComponent;
  let fixture: ComponentFixture<RegeneratePoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegeneratePoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegeneratePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
