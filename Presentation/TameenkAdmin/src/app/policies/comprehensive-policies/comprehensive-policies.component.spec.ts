import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivePoliciesComponent } from './comprehensive-policies.component';

describe('ComprehensivePoliciesComponent', () => {
  let component: ComprehensivePoliciesComponent;
  let fixture: ComponentFixture<ComprehensivePoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivePoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
