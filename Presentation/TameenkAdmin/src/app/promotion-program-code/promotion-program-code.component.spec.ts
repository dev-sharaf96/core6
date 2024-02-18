import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramCodeComponent } from './promotion-program-code.component';

describe('PromotionProgramCodeComponent', () => {
  let component: PromotionProgramCodeComponent;
  let fixture: ComponentFixture<PromotionProgramCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
