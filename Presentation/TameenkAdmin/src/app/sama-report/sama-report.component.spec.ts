import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamaReportComponent } from './sama-report.component';

describe('SamaReportComponent', () => {
  let component: SamaReportComponent;
  let fixture: ComponentFixture<SamaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
