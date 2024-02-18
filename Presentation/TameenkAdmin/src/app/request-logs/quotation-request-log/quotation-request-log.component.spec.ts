import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationRequestLogComponent } from './quotation-request-log.component';

describe('QuotationRequestLogComponent', () => {
  let component: QuotationRequestLogComponent;
  let fixture: ComponentFixture<QuotationRequestLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationRequestLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationRequestLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
