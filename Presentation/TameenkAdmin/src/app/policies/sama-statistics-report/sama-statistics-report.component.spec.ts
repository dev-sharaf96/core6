import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamaStatisticsReportComponent } from './sama-statistics-report.component';

describe('SamaStatisticsReportComponent', () => {
  let component: SamaStatisticsReportComponent;
  let fixture: ComponentFixture<SamaStatisticsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamaStatisticsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamaStatisticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
