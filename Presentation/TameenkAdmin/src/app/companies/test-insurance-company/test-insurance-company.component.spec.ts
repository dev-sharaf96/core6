import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInsuranceCompanyComponent } from './test-insurance-company.component';

describe('TestInsuranceCompanyComponent', () => {
  let component: TestInsuranceCompanyComponent;
  let fixture: ComponentFixture<TestInsuranceCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInsuranceCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInsuranceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
