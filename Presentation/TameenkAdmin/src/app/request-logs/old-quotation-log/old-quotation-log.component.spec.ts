import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldQuotationLogComponent } from './old-quotation-log.component';

describe('OldQuotationLogComponent', () => {
  let component: OldQuotationLogComponent;
  let fixture: ComponentFixture<OldQuotationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldQuotationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldQuotationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
