import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareefDiscountsComponent } from './wareef-discounts.component';

describe('WareefDiscountsComponent', () => {
  let component: WareefDiscountsComponent;
  let fixture: ComponentFixture<WareefDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareefDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareefDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
