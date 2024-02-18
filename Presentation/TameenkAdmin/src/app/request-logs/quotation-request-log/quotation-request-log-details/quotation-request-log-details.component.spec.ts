import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationRequestLogDetailsComponent } from './quotation-request-log-details.component';

describe('QuotationRequestLogDetailsComponent', () => {
  let component: QuotationRequestLogDetailsComponent;
  let fixture: ComponentFixture<QuotationRequestLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationRequestLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationRequestLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
