import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramComponent } from './promotion-program.component';

describe('PromotionProgramComponent', () => {
  let component: PromotionProgramComponent;
  let fixture: ComponentFixture<PromotionProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
