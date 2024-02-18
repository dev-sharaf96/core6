import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramNationalidsComponent } from './promotion-program-nationalids.component';

describe('PromotionProgramNationalidsComponent', () => {
  let component: PromotionProgramNationalidsComponent;
  let fixture: ComponentFixture<PromotionProgramNationalidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramNationalidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramNationalidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
