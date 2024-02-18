import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesLogComponent } from './purchases-log.component';

describe('PurchasesLogComponent', () => {
  let component: PurchasesLogComponent;
  let fixture: ComponentFixture<PurchasesLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
