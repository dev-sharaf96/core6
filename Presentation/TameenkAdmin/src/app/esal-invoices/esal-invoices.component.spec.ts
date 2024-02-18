import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsalInvoicesComponent } from './esal-invoices.component';

describe('EsalInvoicesComponent', () => {
  let component: EsalInvoicesComponent;
  let fixture: ComponentFixture<EsalInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsalInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsalInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
