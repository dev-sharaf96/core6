import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyStatisticsReportComponent } from './policy-statistics-report.component';

describe('PolicyStatisticsReportComponent', () => {
  let component: PolicyStatisticsReportComponent;
  let fixture: ComponentFixture<PolicyStatisticsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyStatisticsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyStatisticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
